// import "https://deno.land/std@0.163.0/dotenv/load.ts";
// import { startServer } from "./backend/server.ts";

// await startServer();
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });