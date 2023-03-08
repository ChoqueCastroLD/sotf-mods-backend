import * as path from "https://deno.land/std@0.178.0/path/mod.ts";
import { renderFileAsync } from "https://deno.land/x/pug_async@1.0.2/mod.ts";

// deno-lint-ignore no-explicit-any
export async function render(template_name: string, data: any) {
  const filepath = path.join(Deno.cwd(), "frontend", `${template_name}.pug`);
  return await renderFileAsync(filepath, data) as string;
}
