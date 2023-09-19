import { renderFile } from "pug";
import path from "path";

// deno-lint-ignore no-explicit-any
export async function render(template_name, data) {
  const path_string = path.join(process.cwd(), `/frontend/${template_name}.pug`);
  return renderFile(path_string.toString(), data);
}
