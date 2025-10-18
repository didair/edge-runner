#!/bin/sh

echo "┌──────────────────────────────┐"
echo "│      edge-runner started     │"
echo "└──────────────────────────────┘"

while true; do
  deno run --allow-read --allow-net --allow-env runner.ts
  sleep 60
done
