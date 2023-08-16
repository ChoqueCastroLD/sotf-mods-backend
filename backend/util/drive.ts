export async function uploadFile(
  file: Uint8Array,
  filename: string,
): Promise<string> {
  const formData = new FormData();
  const blob = new Blob([file]);
  formData.append('file', blob, filename);
  let url = Deno.env.get("MOD_UPLOAD_ENDPOINT") + "";
  url += "?filename=" + filename;
  const f = await fetch(url, {
    method: "POST",
    body: formData
  });
  const r = await f.json();
  if(!r.filename) throw r;
  return r.filename;
}
