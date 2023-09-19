import sanitizeHtml from 'sanitize-html';


export function sanitizeInput(input) {
  if (!input) return "";
  const allowedPattern = /[^a-zA-Z0-9,.¡!¿?$%&()#+;/'" _-]/g;
  const sanitizedInput = sanitizeHtml(input.replace(allowedPattern, ""));
  return sanitizedInput.trim().replace(/<[^>]*>?/gm, '');
}
