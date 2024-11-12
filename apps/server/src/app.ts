import '@/config'
import Server from '@/server'
import * as db from '@/models/connector'
import { logger } from '@/utils/logger'
;(async () => {
    const server = new Server()

    server.listen()
    await db.connect()

    async function shutdown() {
        logger.info('gracefully shutdown fienmee')
        await server.close()
        logger.info('shutdown complete')
        process.exit()
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
})()
