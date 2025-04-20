import { APIError } from '@/types/errors'

export class UnknownUserError extends APIError {
    constructor(cause: Error | string = null) {
        super(404, 4100, 'unknown user error', cause)
        Object.setPrototypeOf(this, UnknownUserError.prototype)
        Error.captureStackTrace(this, UnknownUserError)
    }
}

export class DeletedUserError extends APIError {
    constructor(cause: Error | string = null) {
        super(404, 4101, 'deleted user error', cause)
        Object.setPrototypeOf(this, DeletedUserError.prototype)
        Error.captureStackTrace(this, DeletedUserError)
    }
}

export class UnknownProviderError extends APIError {
    constructor(cause: Error | string = null) {
        super(404, 4102, 'unknown oauth provider error', cause)
        Object.setPrototypeOf(this, UnknownProviderError.prototype)
        Error.captureStackTrace(this, UnknownProviderError)
    }
}
