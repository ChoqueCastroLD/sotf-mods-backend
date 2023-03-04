import { configAsync } from "https://deno.land/x/dotenv/mod.ts";

await configAsync({
    export: true,
});

import { startServer } from "./backend/server.ts";

await startServer();