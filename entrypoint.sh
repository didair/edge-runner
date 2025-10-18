#!/bin/sh

echo "Starting edge function runner..."

while true; do
  deno run --allow-read --allow-net --allow-env runner.ts
  sleep 60
done
