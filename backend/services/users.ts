import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { prisma } from "./prisma.ts";
import { hashPassword, verifyPassword } from "../util/hash.ts";
import { generateToken, verifyToken } from "../util/token.ts";
import { User } from "../../generated/client/deno/edge.ts";

export async function registerUser(email: string, name: string, password: string, confirm_password: string) {
  const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const errors = [];

  if (password.length < 8)
    errors.push({ field: 'password', message: "Password must be at least 8 characters long" });
  if (password.length > 64)
    errors.push({ field: 'password', message: "Password must be at most 64 characters long" });
  if (password !== confirm_password)
    errors.push({ field: 'password', message: "Passwords do not match" });
  if (name.length < 3)
    errors.push({ field: 'username', message: "Name must be at least 3 characters long" });
  if (name.length > 20)
    errors.push({ field: 'username', message: "Name must be at most 20 characters long" });
  if(email.length < 6)
    errors.push({ field: 'email', message: "Email must be at least 6 characters long" });
  if(email.length > 254)
    errors.push({ field: 'email', message: "Email must be at most 254 characters long" });
  if(!EMAIL_REGEX.test(email))
    errors.push({ field: 'email', message: "Invalid email format" });

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser)
    errors.push({ field: 'email', message: "User with this email already exists" });
  const existingUserName = await prisma.user.findFirst({
    where: { name },
  });
  if (existingUserName)
    errors.push({ field: 'username', message: "User with this name already exists" });
  const slug = slugify(name, {
    lower: true,
  }).trim();
  const existingUserSlug = await prisma.user.findFirst({
    where: { slug },
  });
  if (existingUserSlug)
    errors.push({ field: 'username', message: "User with this name/slug already exists" });

  if (errors.length > 0)
    return { errors, status: false };
  
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      slug,
    },
  });

  return { errors: [], status: !!user };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  const errors = [];

  if (!user) {
    errors.push({ field: 'email', message: "User with this email does not exist" });
  } else {
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      errors.push({ field: 'password', message: "Incorrect password" });
    }
  }

  if (errors.length > 0)
    return { errors, status: false, token: null };

  const token = await generateToken(user?.id);

  return { errors: [], status: !!token, token };
}

export async function getUserByToken(token: string) {
  const userId = await verifyToken(token);
  if (!userId)
    return null;
  return await prisma.user.findUnique({
    where: { id: parseInt(userId.toString()) },
  });
}

export async function updateUserProfile(userId: number, profileData: Partial<User>) {
  return await prisma.user.update({
    where: { id: userId },
    data: profileData,
  });
}

export async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function getProfileBySlug(userSlug: string) {
  return await prisma.user.findFirst({
    where: {
      slug: {
        equals: userSlug,
      }
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
