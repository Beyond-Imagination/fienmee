import http from 'http'
import express from 'express'
import compression from 'compression'
import hpp from 'hpp'
import helmet from 'helmet'
import cors from 'cors'
import newrelic from 'newrelic'

import { logger, loggerMiddleware } from '@/utils/logger'
import { NODE_ENV, HOST, PORT } from '@/config'
import controllers from '@/controllers'
import middlewares from '@/middlewares'

export default class Server {
    app: express.Application
    server: http.Server

    constructor() {
        this.app = express()
        this.app.locals.newrelic = newrelic

        this.setPreMiddleware()
        this.setController()
        this.setPostMiddleware()
    }

    setPreMiddleware() {
        this.app.use(helmet())
        this.app.use(cors())
        this.app.use(compression())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(hpp())
        this.app.use(loggerMiddleware)
    }

    setController() {
        this.app.use('/v1/users', controllers.v1.users)
        this.app.use('/v1/events', controllers.v1.events)
        this.app.use('/v1/enquiries', controllers.v1.enquiries)
        this.app.use('/v1/schedules', controllers.v1.schedules)
    }

    setPostMiddleware() {
        this.app.use(middlewares.error)
    }

    public listen() {
        this.server = this.app.listen(PORT, HOST, () => {
            logger.info(`🚀 App listening on the host: ${HOST} port: ${PORT} ENV: ${NODE_ENV}`)
        })
    }

    public async close(): Promise<void> {
        return new Promise(resolve => {
            this.server.close(() => {
                resolve()
            })
        })
    }
}
