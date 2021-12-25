import { PrismaClient } from '@prisma/client';

export const client = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  rejectOnNotFound: true,
});

export type Client = typeof client;
