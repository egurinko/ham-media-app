const opts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" }
        }
      }
    }
  }
}

const routes = async (app, options) => {
  const collection = app.mongo.db.collection("test_collection")
  
  app.get("/", async (request, reply) => {
    return { hello: "world" }
  })

  app.get("/animals/:animal", async (request, reply)=>{
    const result = await collection.findOne({ animal: request.params.animal})
    if(result === null){
      throw new Error("Invalid value")
    }
    return result
  })
}

export default routes