import { APIError } from '@/types/errors/error'
import { ErrorConfig } from '@/types/errors/ErrorConfig'

export class InternalServerError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.INTERNAL_SERVER_ERROR
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, InternalServerError.prototype)
        Error.captureStackTrace(this, InternalServerError)
    }
}
