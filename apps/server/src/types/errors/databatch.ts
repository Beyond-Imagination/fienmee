import { APIError } from '@/types/errors/error'

export class SeoulDataServerError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 5000, 'seoul data server error', cause)
        Object.setPrototypeOf(this, SeoulDataServerError.prototype)
        Error.captureStackTrace(this, SeoulDataServerError)
    }
}

export class SeoulDataUpdateError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 5001, 'seoul data update error', cause)
        Object.setPrototypeOf(this, SeoulDataServerError.prototype)
        Error.captureStackTrace(this, SeoulDataServerError)
    }
}
