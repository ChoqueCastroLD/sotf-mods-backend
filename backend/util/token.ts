import "./env.ts";
import {
    create,
    verify,
    getNumericDate,
    Payload
  } from "https://deno.land/x/djwt@v2.8/mod.ts";

const encoder = new TextEncoder();
const JWT_SECRET = await crypto.subtle.importKey(
  "raw",
  encoder.encode(Deno.env.get("JWT_SECRET") || "ABCDEFG"),
  { name: "HMAC", hash: { name: "SHA-512" } },
  false,
  ["sign", "verify"]
);
console.log("JWT SECRET")
console.log(Deno.env.get("JWT_SECRET") || "ABCDEFG");
console.log(JWT_SECRET);


const JWT_EXPIRATION = 60 * 60 * 24 * 7; // 7 days in seconds

export async function generateToken(userId?: number) {
  console.log({ userId });
  if (!userId) throw new Error("User ID is required to generate token");

  const payload: Payload = {
    userId: userId,
    exp: getNumericDate(Date.now() / 1000 + JWT_EXPIRATION),
  };

  const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, JWT_SECRET);

  if (!jwt)
    throw new Error("Failed to generate token");

  console.log({ jwt });
  return jwt;
}

export async function verifyToken(token: string) {
  console.log({ token, JWT_SECRET });
  const payload = await verify(token, JWT_SECRET);
  if (!payload)
    throw new Error("Failed to verify token");
  return payload.userId;
}