FROM denoland/deno:alpine-2.4.1

WORKDIR /app
COPY runner.ts .
COPY entrypoint.sh .
COPY deno.json .
COPY deno.lock .
RUN chmod +x entrypoint.sh && apk add --no-cache dumb-init

CMD ["dumb-init", "./entrypoint.sh"]