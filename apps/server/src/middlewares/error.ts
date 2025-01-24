import { NextFunction, Request, Response } from 'express'

import { IErrorResponse } from '@fienmee/types'
import { APIError } from '@/types/errors/error'
import { InternalServerError } from '@/types/errors'
import { logger } from '@/utils/logger'

const errorMiddleware = (error: APIError, req: Request, res: Response, next: NextFunction) => {
    try {
        if (!(error instanceof APIError)) {
            error = new InternalServerError(error)
        }
        res.meta = res.meta ? { ...res.meta, error } : { error }
    } catch (err) {
        logger.error('fail in error middleware', { original: error, new: err })
        error = new InternalServerError(err)
    }
    res.status(error.statusCode).json({
        message: error.message,
        code: error.errorCode,
    } as IErrorResponse)
}

export default errorMiddleware
