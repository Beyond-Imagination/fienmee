import http from 'http'
import express from 'express'
import compression from 'compression'
import hpp from 'hpp'
import helmet from 'helmet'
import cors from 'cors'

import { logger, loggerMiddleware } from '@/utils/logger'
import { NODE_ENV, PORT } from '@/config'
import controllers from '@/controllers'

export default class Server {
    app: express.Application
    server: http.Server

    constructor() {
        this.app = express()

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
        this.app.use('/v1/enquiry', controllers.v1.enquiries)
    }

    setPostMiddleware() {}

    public listen() {
        this.server = this.app.listen(PORT, () => {
            logger.info(`🚀 App listening on the port: ${PORT} ENV: ${NODE_ENV}`)
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
