import { parse } from "$std/yaml/mod.ts";

const CONFIG_PATH = Deno.env.get("EDGE_CONFIG_PATH") ?? "./config.yaml";

type Function = {
  enabled?: boolean;
  days?: number[]; // 0–7
  times?: string[]; // "HH:mm"
  every?: number; // in minutes
};

type Config = {
  functions: Record<string, Function>;
};

const configText = await Deno.readTextFile(CONFIG_PATH);
const config = parse(configText) as Config;
const now = new Date();
const currentTime = now.toTimeString().slice(0, 5); // "HH:mm"
const currentMinute = now.getMinutes();

function currentDay(): number {
  return (new Date().getDay() + 5) % 7 + 1; // convert 0-6 (Sun-Sat) -> 1-7 (Mon-Sun)
};

const log = console.log;

for (const [name, fnConfig] of Object.entries(config.functions)) {
  // --- Check schedule ---
  const shouldRun =
    typeof fnConfig.every === "number"
      ? currentMinute % fnConfig.every === 0
      : fnConfig.days?.includes(currentDay()) &&
        fnConfig.times?.includes(currentTime);

  if (!shouldRun || !(fnConfig.enabled || true)) continue;

  console.log(`[${new Date().toISOString()}] ▶ Running ${name}...`);

  // Replace console.log method for better logging
  console.log = (...args: unknown[]) => {
    const timestamp = new Date().toISOString();
    const line = args.map(String).join(" ");
    log(`[${name}] [${timestamp}] ${line}`);
  };

  const mod = await import(`./functions/${name}.ts`);
  if (typeof mod.handler === "function") {
    await mod.handler();
    console.log = log; // Restore console log
  } else {
    console.warn(`⚠ ${name} has no exported handler`);
  }
}
