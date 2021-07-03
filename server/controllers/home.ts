import { FastifyRequest, FastifyReply } from 'fastify'

const get = async (request: FastifyRequest, reply: FastifyReply) => {
  return { hello: "world" }
}

export const homeController = { 
  get 
}
