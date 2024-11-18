import { HttpException } from '@/exceptions/HttpException'

export class NotFoundRouteException extends HttpException {
    constructor() {
        super(404, 'Route not found')
        Object.setPrototypeOf(this, NotFoundRouteException.prototype)
        Error.captureStackTrace(this, NotFoundRouteException)
    }
}
