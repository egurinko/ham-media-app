import { join } from "path"
import { FastifyPluginCallback } from 'fastify'
import mercurius from "mercurius"
import { makeSchema } from "nexus"
// import { Query } from "./query"

const schema = makeSchema({
  types: [],
  outputs: {
    typegen: join(__dirname, "../../../graphql/internalApi", "types.d.ts"),
    schema: join(__dirname, "../../../graphql/internalApi", "schema.graphql"),
  }
})

const internalApi: FastifyPluginCallback = async (app, _options) => {
  app.register(mercurius, { 
    routes: true,
    schema,
    graphiql: true,
  })
}

export { internalApi }
