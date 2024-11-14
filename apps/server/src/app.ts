import '@/config'
import Server from '@/server'
import { logger } from '@/utils/logger'
import * as db from '@/models/connector'
;(async () => {
    await db.connect()
    const server = new Server()
    server.listen()

    async function shutdown() {
        logger.info('gracefully shutdown fienmee')
        await server.close()
        await db.close()
        logger.info('shutdown complete')
        process.exit()
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
})()
