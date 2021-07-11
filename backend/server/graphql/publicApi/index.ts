import { join } from "path"
import { FastifyPluginCallback } from 'fastify'
import mercurius from "mercurius"
import { makeSchema } from "nexus"
// import { Query } from "./query"

const schema = makeSchema({
  types: [],
  outputs: {
    typegen: join(__dirname, "../../../../graphql/publicApi", "types.d.ts"),
    schema: join(__dirname, "../../../../graphql/publicApi", "schema.graphql"),
  }
})

const publicApi: FastifyPluginCallback = async (app, _options) => {
  app.register(mercurius, { 
    routes: true,
    schema,
    graphiql: true,
  })
}

export { publicApi }
