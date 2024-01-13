import { PrismaClient } from '@prisma/client';
import { isTest } from './environments';

let prisma;

if (process.env['NODE_ENV'] === 'production') {
  prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: isTest ? [] : ['query', 'info', 'warn', 'error'],
    });
  }

  prisma = global.prisma;
}

export const client = prisma;

export type Client = typeof client;
