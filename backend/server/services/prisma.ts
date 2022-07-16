import { PrismaClient } from '@prisma/client';
import { isTest } from './environments';

export const client = new PrismaClient({
  log: isTest ? [] : ['query', 'info', 'warn', 'error'],
});

export type Client = typeof client;
