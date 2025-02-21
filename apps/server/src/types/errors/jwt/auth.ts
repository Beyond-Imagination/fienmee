import { APIError } from '@/types/errors'

export class UnauthorizedTokenError extends APIError {
    constructor(cause: Error | string = null) {
        super(401, 4010, 'Unauthorized Token', cause)
        Object.setPrototypeOf(this, UnauthorizedTokenError.prototype)
        Error.captureStackTrace(this, UnauthorizedTokenError)
    }
}

export class InvalidRequestTokenError extends APIError {
    constructor(cause: Error | string = null) {
        super(400, 4000, 'invalid request token', cause)
        Object.setPrototypeOf(this, InvalidRequestTokenError.prototype)
        Error.captureStackTrace(this, InvalidRequestTokenError)
    }
}

export class InvalidTokenTypeError extends APIError {
    constructor(cause: Error | string = null) {
        super(400, 4011, 'invalid token type', cause)
        Object.setPrototypeOf(this, InvalidTokenTypeError.prototype)
        Error.captureStackTrace(this, InvalidTokenTypeError)
    }
}
