import { APIError } from '@/types/errors/error'

export class DuplicateNotificationTokenError extends APIError {
    constructor(cause: Error | string = null) {
        super(400, 8000, 'duplicate notificationToken error', cause)
        Object.setPrototypeOf(this, DuplicateNotificationTokenError.prototype)
        Error.captureStackTrace(this, DuplicateNotificationTokenError)
    }
}

export class DeviceIdNotRegisteredError extends APIError {
    constructor(cause: Error | string = null) {
        super(400, 8001, 'deviceId not registered error', cause)
        Object.setPrototypeOf(this, DuplicateNotificationTokenError.prototype)
        Error.captureStackTrace(this, DuplicateNotificationTokenError)
    }
}

export class FCMMulticastSendError extends APIError {
    constructor(cause: Error | string = null) {
        super(400, 8001, 'FCM multicast send error', cause)
        Object.setPrototypeOf(this, FCMMulticastSendError.prototype)
        Error.captureStackTrace(this, FCMMulticastSendError)
    }
}
