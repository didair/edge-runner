# 🦕 Edge Runner

A modern, minimal, self-hosted edge function runner built with [Deno](https://deno.com) and packaged as a Docker image. It supports:

- ⏰ **Scheduled execution** via YAML config
- 🧩 **Modular functions** stored in `functions/`

---

## 🚀 Getting Started

### 1. Add Your Functions

Create TypeScript files under `functions/`, each exporting a `handler()` function:

```ts
// functions/hello.ts
export async function handler() {
  console.log("Hello from edge function!");
}
```

### 2. 🐳 Run the Edge Runner container

As a command:

```bash
docker run \
  --rm \
  -v $(pwd)/functions:/app/functions \
  -v $(pwd)/config.yaml:/app/config.yaml \
  -e EDGE_CONFIG_PATH=/app/config.yaml \
  didair/edge-runner:latest
```

Or for example in your own Dockerfile
```docker
FROM didair/edge-runner:latest

# Set working directory
WORKDIR /app

# Copy your functions and config into the image
COPY functions/ ./functions/
COPY config.yaml ./config.yaml
```
