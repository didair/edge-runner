FROM denoland/deno:alpine-2.44.0

# App directory
WORKDIR /app

# Copy runner and config
COPY edge/ ./edge/

# Add a lightweight cron runner (uses dumb-init + busybox)
RUN apk add --no-cache dumb-init

# Entry point script
COPY edge/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Required permissions for runner.ts
CMD ["dumb-init", "./entrypoint.sh"]