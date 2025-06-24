import { APIError } from '@/types/errors/error'

export class UnauthorizedComment extends APIError {
    constructor(cause: Error | string = null) {
        super(401, 6000, 'unauthorized comment', cause)
        Object.setPrototypeOf(this, UnauthorizedComment.prototype)
        Error.captureStackTrace(this, UnauthorizedComment)
    }
}

export class CommentNotFound extends APIError {
    constructor(cause: Error | string = null) {
        super(404, 6001, 'Invalid comment id', cause)
        Object.setPrototypeOf(this, CommentNotFound.prototype)
        Error.captureStackTrace(this, CommentNotFound)
    }
}

export class EventNotFound extends APIError {
    constructor(cause: Error | string = null) {
        super(404, 6002, 'invalid event id error', cause)
        Object.setPrototypeOf(this, EventNotFound.prototype)
        Error.captureStackTrace(this, EventNotFound)
    }
}

export class UnauthorizedEvent extends APIError {
    constructor(cause: Error | string = null) {
        super(401, 6003, 'unauthorized event error', cause)
        Object.setPrototypeOf(this, UnauthorizedEvent.prototype)
        Error.captureStackTrace(this, UnauthorizedEvent)
    }
}
