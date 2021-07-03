import fastify from "fastify"

const app = fastify({ logger: true })

app.register(import("./service/db-connector"))
app.register(import("./routes/index"))

export { app }
