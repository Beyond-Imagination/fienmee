import { APIError } from '@/types/errors/error'

export class UnauthorizedSchedule extends APIError {
    constructor(cause: Error | string = null) {
        super(401, 40100, 'unauthorized schedule', cause)
        Object.setPrototypeOf(this, UnauthorizedSchedule.prototype)
        Error.captureStackTrace(this, UnauthorizedSchedule)
    }
}
