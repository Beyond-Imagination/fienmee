import { APIError } from '@/types/errors/error'

export class OAuthUserInfoException extends APIError {
    constructor(cause: Error | string = null) {
        super(422, 4220, 'auth http client exception', cause)
        Object.setPrototypeOf(this, OAuthUserInfoException.prototype)
        Error.captureStackTrace(this, OAuthUserInfoException)
    }
}
