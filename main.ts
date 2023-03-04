import { config } from "https://deno.land/x/dotenv/mod.ts";

config({
    export: true,
});

import { startServer } from "./backend/server.ts";

await startServer();