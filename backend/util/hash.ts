import { hash, compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isPasswordValid = await compare(password, hashedPassword);
  return isPasswordValid;
}
