import { FastifyRequest, FastifyReply } from 'fastify';
import { InternalUser } from '@prisma/client';
import { client } from '@/services/prisma';
import type { Client } from '@/services/prisma';
import { verify } from '@/services/authentication';

export interface Context {
  prisma: Client;
  currentInternalUser: InternalUser | null;
}

export const context = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
  const currentInternalUser = await getCurrentInternalUser(
    request.headers['authorization']
  );

  return {
    prisma: client,
    currentInternalUser,
  };
};

const getCurrentInternalUser = async (authorizationHeader?: string) => {
  const bearerLength = 'Bearer '.length;

  if (authorizationHeader && authorizationHeader.length > bearerLength) {
    const token = authorizationHeader.slice(bearerLength);

    try {
      const decoded = await verify(token);
      return await client.internalUser.findUniqueOrThrow({
        where: { email: decoded.email },
      });
    } catch (error) {
      throw new Error('Authentication Error');
    }
  }
  throw new Error('Authentication Error');
};
