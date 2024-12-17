import { APIError } from '@/types/errors'

export class MissingTokenError extends APIError {
    constructor(cause: Error | string = null) {
        super(400, 4000, 'miss out the token!', cause)
        Object.setPrototypeOf(this, MissingTokenError.prototype)
        Error.captureStackTrace(this, MissingTokenError)
    }
}

export class UnauthorizedTokenError extends APIError {
    constructor(cause: Error | string = null) {
        super(401, 4010, 'Failed to get kakao user information', cause)
        Object.setPrototypeOf(this, UnauthorizedTokenError.prototype)
        Error.captureStackTrace(this, UnauthorizedTokenError)
    }
}
