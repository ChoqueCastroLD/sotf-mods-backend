import "./env.js";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

const JWT_SECRET = process.env.JWT_SECRET || "ABCDEFG";
const JWT_EXPIRATION = 60 * 60 * 24 * 7; // 7 days in seconds

export function generateToken(userId) {
  if (!userId) throw new Error("User ID is required to generate token");

  const payload = {
    userId: userId,
    exp: Math.floor((Date.now() / 1000) + JWT_EXPIRATION),
  };
  const jwt = sign({data: payload}, JWT_SECRET);

  if (!jwt)
    throw new Error("Failed to generate token");

  return jwt;
}

export function verifyToken(token) {
  if (!token) {
    throw new Error("Token is required");
  }
  const payload = verify(token, JWT_SECRET);
  if (!payload) {
    throw new Error("Failed to verify token");
  }
  return payload;
}