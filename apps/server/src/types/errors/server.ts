import { APIError } from '@/types/errors/error'

export class InternalServerError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 500, 'internal serve error', cause)
        Object.setPrototypeOf(this, InternalServerError.prototype)
        Error.captureStackTrace(this, InternalServerError)
    }
}
