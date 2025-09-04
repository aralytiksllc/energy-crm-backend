// External
import { PrismaClient } from '@prisma/client';

// Internal

export const prismaExtension = new PrismaClient().$extends({});

export type PrismaExtension = typeof prismaExtension;
