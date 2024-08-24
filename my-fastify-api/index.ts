import {server} from "./app/server";
import {initDb} from "./app/database";

console.log(`Running in [${process.env.NODE_ENV}] mode`)

async function start() {
    // provision database
    await initDb()
    // bootstrap the server
    const host = process.env.HOST
    const port = process.env.PORT as unknown as number
    await server.listen({host, port})
}

start().then(() => console.log('open to business'))
