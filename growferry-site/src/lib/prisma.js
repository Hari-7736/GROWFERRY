import { PrismaClient } from "@prisma/client";

// Reuse the client across hot reloads in dev, and across serverless
// invocations where possible, instead of opening a new connection each time.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
