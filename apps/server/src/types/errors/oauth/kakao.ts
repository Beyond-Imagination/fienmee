import { APIError } from '@/types/errors/error'
import { ErrorConfig } from '@/types/errors/ErrorConfig'

export class KakaoUserInformationError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.KAKAO_GET_USER_INFORMATION_FAILED
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, KakaoUserInformationError.prototype)
        Error.captureStackTrace(this, KakaoUserInformationError)
    }
}

export class KakaoNetworkError extends APIError {
    constructor(cause: Error | string = null) {
        const { statusCode, errorCode, message } = ErrorConfig.KAKAO_NETWORK_ACCESS_FAILED
        super(statusCode, errorCode, message, cause)
        Object.setPrototypeOf(this, KakaoNetworkError.prototype)
        Error.captureStackTrace(this, KakaoNetworkError)
    }
}
