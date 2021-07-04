import { FastifyPluginCallback } from 'fastify'
import { controller } from "../../controllers"

const internalApiRouter: FastifyPluginCallback = async (app, _options) => {
  const { internalApi } = controller
  app.get("/internal_api/internal_users", internalApi.internalUsers.list)
}

export { internalApiRouter }
