import { FastifyPluginCallback } from 'fastify'
import { internalApiRouter } from "./internalApi"

const router: FastifyPluginCallback = async (app, _options) => {
  app.register(internalApiRouter)
}

export { router }
