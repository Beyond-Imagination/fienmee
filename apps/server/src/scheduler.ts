import schedule from 'node-schedule'

import { fetchAndSaveSeoulData } from '@/services/seoul/databatch'
import { logger } from '@/utils/logger'
import { deleteOldDeletedUsers } from '@/services/user'

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
        schedule.scheduleJob('0 2 * * *', async () => {
            try {
                logger.info('Scheduler job started for Tour Api Data update')
            } catch (error) {
                logger.error(`Tour Api Data Scheduler failed.`, { error: error })
            }
        })

        schedule.scheduleJob('0 3 * * *', async () => {
            try {
                const deletedUsersCount = await deleteOldDeletedUsers()
                logger.info(`Scheduler job finished for old deleted user data: ${deletedUsersCount}`)
            } catch (error) {
                logger.error(`Delete User data Scheduler failed.`, { error: error })
            }
        })
    }

    public async stop() {
        await schedule.gracefulShutdown()
    }
}
