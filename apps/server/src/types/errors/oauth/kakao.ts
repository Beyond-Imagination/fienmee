import { APIError } from '@/types/errors/error'

export class KakaoUserInformationError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 6050, 'Failed to get kakao user information', cause)
        Object.setPrototypeOf(this, KakaoUserInformationError.prototype)
        Error.captureStackTrace(this, KakaoUserInformationError)
    }
}

export class KakaoNetworkError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 6051, 'Network error while accessing Kakao API', cause)
        Object.setPrototypeOf(this, KakaoNetworkError.prototype)
        Error.captureStackTrace(this, KakaoNetworkError)
    }
}
