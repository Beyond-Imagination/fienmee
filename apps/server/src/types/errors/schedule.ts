import { APIError } from '@/types/errors/error'

export class UnAuthorizedSchedule extends APIError {
    constructor(cause: Error | string = null) {
        super(401, 40100, 'unauthorized schedule', cause)
        Object.setPrototypeOf(this, UnAuthorizedSchedule.prototype)
        Error.captureStackTrace(this, UnAuthorizedSchedule)
    }
}
