import feathers from "@feathersjs/feathers"
import rest from "@feathersjs/rest-client"

const client = feathers()
client.configure(rest(`http://localhost:${process.env.REACT_APP_FEATHERS_PORT}`).fetch(window.fetch))

export default client
