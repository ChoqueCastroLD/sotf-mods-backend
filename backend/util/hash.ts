import { hash as argonHash, verify as argonVerify } from "https://deno.land/x/argon2@v0.9.2/lib/mod.ts";

const SALT_LENGTH = 16;

function generateRandomSalt(): Uint8Array {
    const values = new Uint8Array(SALT_LENGTH);
    return crypto.getRandomValues(values);
}

export async function hash(password: string) {
  const salt = await generateRandomSalt();
  const hash = await argonHash(password, { salt });
  return hash;
}

export async function verify(hash: string, password: string) {
    return await argonVerify(hash, password);
}
