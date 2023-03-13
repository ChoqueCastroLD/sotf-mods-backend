
import {
    create,
    verify,
    getNumericDate,
    Payload
  } from "https://deno.land/x/djwt@v2.8/mod.ts";

const JWT_SECRET = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
);
const JWT_EXPIRATION = 60 * 60 * 24; // 1 day in seconds

export function generateToken(userId: number) {
    const payload: Payload = {
      userId: userId,
      exp: getNumericDate(Date.now() / 1000 + JWT_EXPIRATION),
    };
  
    const jwt = create({ alg: "HS512", typ: "JWT" }, payload, JWT_SECRET);
  
    if (!jwt) {
      throw new Error("Failed to generate token");
    }
  
    return jwt;
  }

export function verifyToken(token: string) {
    const payload = verify(token, JWT_SECRET);
    if (!payload) {
        throw new Error("Failed to verify token");
    }
    return payload;
}