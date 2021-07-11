import { join } from "path"
import { FastifyPluginCallback } from 'fastify'
import mercurius from "mercurius"
import { makeSchema } from "nexus"
import { $settings } from 'nexus-prisma'
import { client } from "../../services/prisma"
import * as types from "./types"
import { Query } from "./query"

const schema = makeSchema({
  types: [types, Query],
  outputs: {
    typegen: join(__dirname, "../../../graphql/internalApi", "types.d.ts"),
    schema: join(__dirname, "../../../graphql/internalApi", "schema.graphql"),
  },
})

const internalApi: FastifyPluginCallback = async (app, _options) => {
  app.register(mercurius, { 
    routes: true,
    schema,
    graphiql: true,
    context: (_request: any, _reply: any) => {
      return {
        prisma: client
      }
    }
  })


  $settings({
    prismaClientContextField: 'prisma', // <-- Tell Nexus Prisma
  })
}


export { internalApi }
