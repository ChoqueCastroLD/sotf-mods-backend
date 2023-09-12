# sotf-mods-backend

format .prisma
> deno run -A npm:prisma@^4.5 format

push db changes
> deno run -A npm:prisma@^4.5 db push

generate client
> deno run -A --unstable npm:prisma@^4.5 generate --data-proxy

run watch
> deno run -A --watch main.ts

Documentation

https://elements.getpostman.com/redirect?entityId=15040281-f74c5bed-8f19-4854-a5aa-454253d884d0&entityType=collection