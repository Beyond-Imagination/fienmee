import { APIError } from '@/types/errors/error'
import { ErrorConfig } from '@/types/errors/ErrorConfig'

export class UnauthorizedSchedule extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.SCHEDULE_UNAUTHORIZED
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, UnauthorizedSchedule.prototype)
        Error.captureStackTrace(this, UnauthorizedSchedule)
    }
}

export class InvalidRequestFormat extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.REQUEST_FORMAT_INVALID
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, InvalidRequestFormat.prototype)
        Error.captureStackTrace(this, InvalidRequestFormat)
    }
}
