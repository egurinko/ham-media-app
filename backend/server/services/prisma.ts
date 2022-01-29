import { PrismaClient } from '@prisma/client';

export const client = new PrismaClient({
  log:
    process.env['NODE_ENV'] !== 'test'
      ? ['query', 'info', 'warn', 'error']
      : [],
  rejectOnNotFound: true,
});

export type Client = typeof client;
