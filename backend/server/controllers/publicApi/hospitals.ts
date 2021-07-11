import { FastifyRequest, FastifyReply } from 'fastify';

const list = async (_request: FastifyRequest, _reply: FastifyReply) => {
  return { hello: 'world' };
};

export const hospitals = {
  list,
};
