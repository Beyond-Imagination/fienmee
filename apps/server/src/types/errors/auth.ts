import { APIError } from '@/types/errors/error'

export class OAuthUserInfoException extends APIError {
    constructor(cause: Error | string = null) {
        super(422, 4220, 'auth http client exception', cause)
        Object.setPrototypeOf(this, OAuthUserInfoException.prototype)
        Error.captureStackTrace(this, OAuthUserInfoException)
    }
}

export class KakaoLoginFailedException extends APIError {
    constructor(cause: Error | string = null) {
        super(404, 4040, 'Failed to login with kakao login information', cause)
        Object.setPrototypeOf(this, KakaoLoginFailedException.prototype)
        Error.captureStackTrace(this, KakaoLoginFailedException)
    }
}

export class KakaoRegisterFailedException extends APIError {
    constructor(cause: Error | string = null) {
        super(400, 4000, 'Failed to register user information', cause)
        Object.setPrototypeOf(this, KakaoRegisterFailedException)
        Error.captureStackTrace(this, KakaoRegisterFailedException)
    }
}
