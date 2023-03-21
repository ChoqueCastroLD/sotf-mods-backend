import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export async function hash(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function verify(hash: string, password: string) {
    return await bcrypt.compare(password, hash);
}
