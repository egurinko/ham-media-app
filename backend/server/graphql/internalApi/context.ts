import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';
import { InternalUser } from '@prisma/client';
import { client } from '@/services/prisma';
import { verify } from '@/services/authentication';

export interface Context {
  prisma: PrismaClient;
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
      return await client.internalUser.findUnique({
        where: { email: decoded.email },
      });
    } catch (error) {
      console.log({ error });
    }
  }
  return null;
};
