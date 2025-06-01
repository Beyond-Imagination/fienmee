import { APIError } from '@/types/errors/error'

export class FCMMulticastSendError extends APIError {
    constructor(cause: Error | string = null) {
        super(400, 8000, 'FCM multicast send error', cause)
        Object.setPrototypeOf(this, FCMMulticastSendError.prototype)
        Error.captureStackTrace(this, FCMMulticastSendError)
    }
}
