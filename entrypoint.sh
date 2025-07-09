#!/bin/sh

echo "Starting edge function runner..."

while true; do
  echo "Running edge/runner.ts at $(date)"
  deno run --allow-read --allow-net --allow-env runner.ts
  sleep 60
done
