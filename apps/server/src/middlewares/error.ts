import { NextFunction, Request, Response } from 'express'

import { APIError } from '@/types/errors/error'
import { InternalServerError } from '@/types/errors'
import { logger } from '@/utils/logger'

const errorMiddleware = (error: APIError, req: Request, res: Response, next: NextFunction) => {
    try {
        if (!(error instanceof APIError)) {
            error = new InternalServerError(error)
        }
        res.meta = res.meta ? { ...res.meta, error } : { error }
        res.status(error.statusCode).json({
            message: error.message,
            code: error.errorCode,
        })
    } catch (err) {
        logger.error('fail in error middleware', { original: error, new: err })
        res.status(500).json({ message: 'internal server error', code: 500 })
    }
}

export default errorMiddleware
