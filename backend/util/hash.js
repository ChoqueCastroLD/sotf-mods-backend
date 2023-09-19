import { hashSync, compareSync, genSaltSync } from "bcrypt";

export async function hashPassword(password) {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isPasswordValid = compareSync(password, hashedPassword);
  return isPasswordValid;
}
