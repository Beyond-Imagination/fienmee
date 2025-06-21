import { APIError } from '@/types/errors/error'

export class GoogleUserInformationError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 6050, 'Failed to get google user information', cause)
        Object.setPrototypeOf(this, GoogleUserInformationError.prototype)
        Error.captureStackTrace(this, GoogleUserInformationError)
    }
}

export class GoogleNetworkError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 6051, 'Network error while accessing google API', cause)
        Object.setPrototypeOf(this, GoogleNetworkError.prototype)
        Error.captureStackTrace(this, GoogleNetworkError)
    }
}
