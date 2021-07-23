import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';
import { client } from '../../services/prisma';

export interface Context {
  prisma: PrismaClient;
}

export const context = (
  _request: FastifyRequest,
  _reply: FastifyReply
): Context => ({
  prisma: client,
});
