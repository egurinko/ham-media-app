import { FastifyRequest, FastifyReply } from 'fastify';
import { client } from '@/services/prisma';

const list = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const internalUsers = await client.internalUser.findMany();
    return reply.send({ data: { internalUsers } });
  } catch (error) {
    return reply.status(500).send({ error: `Cannot fetch users` });
  }
};

export const internalUsers = {
  list,
};
