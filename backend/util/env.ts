import { configAsync } from "https://deno.land/x/dotenv/mod.ts";

const env = await configAsync({
    export: true,
});

export default env;