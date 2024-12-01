import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import winston from 'winston'
import winstonDaily from 'winston-daily-rotate-file'
import expressWinston from 'express-winston'

// logs dir
const logDir: string = join(__dirname, '../../logs')

if (!existsSync(logDir)) {
    mkdirSync(logDir)
}

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const winstonOption = {
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.prettyPrint(),
    ),
    transports: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: '%DATE%.error.log',
            maxFiles: 90,
            json: false,
        }),
        new winstonDaily({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: '%DATE%.debug.log',
            maxFiles: 90,
            json: false,
        }),
        new winston.transports.Console(),
    ],
}

const loggerMiddleware = expressWinston.logger({
    ...winstonOption,
    requestWhitelist: ['headers.origin', 'body', 'query'],
    responseWhitelist: ['body', 'statusCode'],
    bodyBlacklist: ['password', 'clientSecret', 'token', 'jwt', 'jwtPayload'],
    headerBlacklist: ['authorization'],
    ignoreRoute: function (req, res) {
        return false
    },
    level: function (req, res) {
        if (res.statusCode >= 500) {
            return 'error'
        } else if (res.statusCode >= 400) {
            return 'warn'
        }
        return 'info'
    },
    meta: true,
    dynamicMeta: function (req, res) {
        return res.meta
    },
})

const logger = winston.createLogger(winstonOption)

export { logger, loggerMiddleware }
