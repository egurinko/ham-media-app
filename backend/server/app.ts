import fastify from "fastify"
import cors from "fastify-cors"
import helmet from "fastify-helmet"
import { router } from "./routes"

const app = fastify({ logger: true })

app.register(helmet,{ 
  contentSecurityPolicy: false 
})
app.register(cors)
app.register(router)

export { app }
