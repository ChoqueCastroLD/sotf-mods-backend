import * as ammonia from "https://deno.land/x/ammonia@0.3.1/mod.ts";
await ammonia.init();

export function sanitizeInput(input: string) {
  if (!input) return "";
  const allowedPattern = /[^a-zA-Z0-9,.¡!¿?$%&()#+;/'" _-]/g;
  const sanitizedInput = ammonia.clean(input.replace(allowedPattern, ""));
  return sanitizedInput.trim().replace(/<[^>]*>?/gm, '');
}
