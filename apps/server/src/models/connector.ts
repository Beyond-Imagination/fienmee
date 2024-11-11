import mongoose from 'mongoose'
import { DB_URI, DB_NAME } from '@/config'
import { logger } from '@/utils/logger'

export async function connect() {
    await mongoose.connect(DB_URI, { dbName: DB_NAME })
    logger.info(`successfully connect mongo db. DB_NAME=${DB_NAME}`)
}

export async function close() {
    await mongoose.connection.close(false)
    logger.info(`successfully close mongo db connection. DB_NAME=${DB_NAME}`)
}
