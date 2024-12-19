import { APIError } from '@/types/errors'

export class UnauthorizedTokenError extends APIError {
    constructor(cause: Error | string = null) {
        super(401, 4010, 'Unauthorized Token', cause)
        Object.setPrototypeOf(this, UnauthorizedTokenError.prototype)
        Error.captureStackTrace(this, UnauthorizedTokenError)
    }
}
