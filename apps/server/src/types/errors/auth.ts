import { APIError } from '@/types/errors/error'

export class HttpClientException extends APIError {
    constructor(cause: Error | string = null) {
        super(422, 4220, 'auth http client exception', cause)
        Object.setPrototypeOf(this, HttpClientException.prototype)
        Error.captureStackTrace(this, HttpClientException)
    }
}
