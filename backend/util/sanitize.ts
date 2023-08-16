export function sanitizeInput(input: string) {
  if (!input) return "";
  const allowedPattern = /[^a-zA-Z0-9,.!? ]/g;
  const sanitizedInput = input.replace(allowedPattern, "");
  return sanitizedInput.trim();
}