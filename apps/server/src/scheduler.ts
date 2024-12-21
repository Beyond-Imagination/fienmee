import schedule from 'node-schedule'

import { fetchAndSaveSeoulData } from '@/services/seoul/databatch'
import { logger } from '@/utils/logger'

export default class DateBatchScheduler {
    public run() {
        schedule.scheduleJob('0 6 * * *', async () => {
            try {
                logger.info('Scheduler job started for Seoul cultural event data update')
                await fetchAndSaveSeoulData()
            } catch (error) {
                logger.error(`Seoul Data Scheduler failed.`, { error: error })
            }
        })
    }

    public async stop() {
        await schedule.gracefulShutdown()
    }
}
