import feathers from "@feathersjs/feathers"
import rest from "@feathersjs/rest-client"

const client = feathers()
client.configure(rest("http://localhost:3030").fetch(window.fetch))

export default client
