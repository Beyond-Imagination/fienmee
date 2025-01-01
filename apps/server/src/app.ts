import '@/config'
import Server from '@/server'
import { logger } from '@/utils/logger'
import * as db from '@/models'
import Scheduler from '@/scheduler'
;(async () => {
    await db.connect()
    const server = new Server()
    const scheduler = new Scheduler()

    scheduler.run()
    server.listen()
    async function shutdown() {
        logger.info('gracefully shutdown fienmee')
        await Promise.all([server.close, scheduler.stop])
        await db.close()
        logger.info('shutdown complete')
        process.exit()
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
})()
