import { FastifyPluginCallback } from 'fastify'

const router: FastifyPluginCallback = async (app, options) => {
  app.get("/", async (request, reply) => {
    return { hello: "world" }
  })
}

export { router }
