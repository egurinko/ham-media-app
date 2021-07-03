import { FastifyPluginCallback } from 'fastify'
import { controller } from "../controllers"

const router: FastifyPluginCallback = async (app, options) => {
  app.get("/", controller.home.get)
}

export { router }
