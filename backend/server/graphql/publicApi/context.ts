import { FastifyRequest, FastifyReply } from 'fastify';
import { client } from '@/services/prisma';
import type { Client } from '@/services/prisma';

export interface Context {
  prisma: Client;
}

export const context = (
  _request: FastifyRequest,
  _reply: FastifyReply,
): Context => ({
  prisma: client,
});
