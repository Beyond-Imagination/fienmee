import { APIError } from '@/types/errors'
import { ErrorConfig } from '@/types/errors/ErrorConfig'

export class UnknownUserError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.USER_NOT_FOUND
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, UnknownUserError.prototype)
        Error.captureStackTrace(this, UnknownUserError)
    }
}

export class DeletedUserError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.USER_ALREADY_DELETED
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, DeletedUserError.prototype)
        Error.captureStackTrace(this, DeletedUserError)
    }
}

export class UnknownProviderError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.OAUTH_PROVIDER_NOT_FOUND
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, UnknownProviderError.prototype)
        Error.captureStackTrace(this, UnknownProviderError)
    }
}
