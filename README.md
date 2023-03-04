# sotf-mods-backend

format .prisma
> deno run -A npm:prisma@^4.5 format

push db changes
> deno run -A npm:prisma@^4.5 db push

generate client
> deno run -A --unstable npm:prisma@^4.5 generate --data-proxy

run watch
> deno run -A --watch main.ts