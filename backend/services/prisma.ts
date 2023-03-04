import env from "../util/env.ts";
import { PrismaClient } from "../../generated/client/deno/edge.ts";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});