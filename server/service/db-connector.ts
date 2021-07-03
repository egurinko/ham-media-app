import fastifyPlugin from "fastify-plugin"

const dbConnector = async (app, options) => {
  app.register(import("fastify-mongodb"), {
    url: "mongodb://localhost:27017/test_data_base"
  })
}

export default fastifyPlugin(dbConnector)
