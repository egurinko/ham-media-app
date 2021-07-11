import { FastifyPluginCallback } from 'fastify'
import { internalApi } from "../graphql/internalApi"
import { publicApi } from "../graphql/publicApi"

const router: FastifyPluginCallback = async (app, _options) => {
  app.register(internalApi, { prefix: "internal_api" })
  app.register(publicApi, { prefix: "public_api" })
}

export { router }
