import { APIError } from '@/types/errors/error'

export class UnauthorizedSchedule extends APIError {
    constructor(cause: Error | string = null) {
        super(401, 4010, 'unauthorized schedule', cause)
        Object.setPrototypeOf(this, UnauthorizedSchedule.prototype)
        Error.captureStackTrace(this, UnauthorizedSchedule)
    }
}

export class InvalidRequestFormat extends APIError {
    constructor(cause: Error | string = null) {
        super(400, 40000, 'invalid request format', cause)
        Object.setPrototypeOf(this, InvalidRequestFormat.prototype)
        Error.captureStackTrace(this, InvalidRequestFormat)
    }
}
