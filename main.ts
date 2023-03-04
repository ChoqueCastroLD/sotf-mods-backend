import { config } from "https://deno.land/x/dotenv/mod.ts";

await config({
    export: true,
});

import { startServer } from "./backend/server.ts";

await startServer();