import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { prisma } from "./prisma.ts";
import { hash, verify } from "../util/hash.ts";
import { User } from "../../generated/client/deno/edge.ts";

export async function registerUser(email: string, name: string, password: string) {
  if (password.length < 8)
    throw new Error("Password must be at least 8 characters long");
  if (name.length < 3)
    throw new Error("Name must be at least 3 characters long");
  if (name.length > 20)
    throw new Error("Name must be at most 20 characters long");
  if(email.length < 6)
    throw new Error("Email must be at least 6 characters long");
  if(email.length > 254)
    throw new Error("Email must be at most 254 characters long");
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser)
    throw new Error("User with this email already exists");
  const existingUserName = await prisma.user.findFirst({
    where: { name },
  });
  if (existingUserName)
    throw new Error("User with this name already exists");
  const slug = slugify(name);
  const existingUserSlug = await prisma.user.findFirst({
    where: { slug },
  });
  if (existingUserSlug)
    throw new Error("User with this name/slug already exists");

  const hashedPassword = await hash(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      slug,
    },
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User with this email does not exist");
  }

  const isPasswordValid = await verify(user.password, password);
  if (!isPasswordValid) {
    throw new Error("Incorrect password");
  }

  return user;
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

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
