import { APIError } from '@/types/errors/error'
import { ErrorConfig } from '@/types/errors/ErrorConfig'

export class SeoulDataServerError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.SEOUL_DATA_SERVER
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, SeoulDataServerError.prototype)
        Error.captureStackTrace(this, SeoulDataServerError)
    }
}

export class SeoulDataUpdateError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.SEOUL_DATA_UPDATE
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, SeoulDataServerError.prototype)
        Error.captureStackTrace(this, SeoulDataServerError)
    }
}
