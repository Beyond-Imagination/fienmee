import { HttpException } from '@/exceptions/HttpException'

export class AuthFailureException extends HttpException {
    constructor() {
        super(401, 'Authentication Failed')
        Object.setPrototypeOf(this, AuthFailureException.prototype)
        Error.captureStackTrace(this, AuthFailureException)
    }
}
