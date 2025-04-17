import { APIError } from '@/types/errors'
import { ErrorConfig } from '@/types/errors/ErrorConfig'

export class UnauthorizedTokenError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.TOKEN_UNAUTHORIZED
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, UnauthorizedTokenError.prototype)
        Error.captureStackTrace(this, UnauthorizedTokenError)
    }
}

export class InvalidRequestTokenError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.REQUEST_TOKEN_INVALID
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, InvalidRequestTokenError.prototype)
        Error.captureStackTrace(this, InvalidRequestTokenError)
    }
}

export class InvalidTokenTypeError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.TOKEN_TYPE_INVALID
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, InvalidTokenTypeError.prototype)
        Error.captureStackTrace(this, InvalidTokenTypeError)
    }
}
