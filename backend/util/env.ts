import { configAsync } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = await configAsync({
    export: true,
});

export default env;