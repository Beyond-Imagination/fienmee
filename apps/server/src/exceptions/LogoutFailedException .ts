import { HttpException } from '@/exceptions/HttpException'

export class LogoutFailedException extends HttpException {
    constructor() {
        super(500, 'Failed to log out.')
        Object.setPrototypeOf(this, LogoutFailedException.prototype)
        Error.captureStackTrace(this, LogoutFailedException)
    }
}
