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

export class TourDataServerError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 5002, 'tour data server error', cause)
        Object.setPrototypeOf(this, TourDataServerError.prototype)
        Error.captureStackTrace(this, TourDataServerError)
    }
}

export class TourDataUpdateError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 5003, 'tour data update error', cause)
        Object.setPrototypeOf(this, TourDataUpdateError.prototype)
        Error.captureStackTrace(this, TourDataUpdateError)
    }
}
