import http from 'http'
import express from 'express'
import compression from 'compression'
import hpp from 'hpp'
import helmet from 'helmet'
import cors from 'cors'

import { logger, loggerMiddleware } from '@/utils/logger'
import { NODE_ENV, PORT, SESSION_SECRET } from '@/config'
import auth from './routers/v1/auth'
import session from 'express-session'
import enquiries from './routers/v1/enquiries'
import passport from 'passport'
import configurePassport from '@/config/passport'
import { NotFoundRouteException } from './exceptions/NotFoundRouteException'

export default class Server {
    app: express.Application
    server: http.Server

    constructor() {
        this.app = express()

        this.setPreMiddleware()
        this.setPassport()
        this.setRoutes()
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

    setPassport() {
        this.app.use(
            session({
                secret: SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: NODE_ENV === 'production',
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24,
                    sameSite: 'lax',
                },
            }),
        )

        this.app.use(passport.initialize())
        this.app.use(passport.session())

        configurePassport(passport)
    }

    setRoutes() {
        this.app.use('/v1/auth', auth)
        this.app.use('/v1/enquiry', enquiries)
    }

    setPostMiddleware() {
        this.app.use((_req, res) => {
            throw new NotFoundRouteException()
        })
    }

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
