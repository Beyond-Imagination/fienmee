import { APIError } from '@/types/errors/error'

export class UnauthorizedComment extends APIError {
    constructor(cause: Error | string = null) {
        super(401, 6000, 'unauthorized schedule', cause)
        Object.setPrototypeOf(this, UnauthorizedComment.prototype)
        Error.captureStackTrace(this, UnauthorizedComment)
    }
}
