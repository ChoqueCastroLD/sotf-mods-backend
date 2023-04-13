import { renderFileAsync } from "https://deno.land/x/pug_async@1.0.2/mod.ts";
import { Path } from "https://deno.land/x/path@v3.0.0/mod.ts";

// deno-lint-ignore no-explicit-any
export async function render(template_name: string, data: any) {
  const path_string = new Path(Deno.cwd() + `/frontend/${template_name}.pug`);
  return await renderFileAsync(path_string.toString(), data) as string;
}
