import { body } from 'express-cargo'
import { loginRequest, registerRequest } from '@fienmee/types'

export class PostUserLoginPayload implements loginRequest {
    @body()
    provider!: string

    @body()
    accessToken!: string

    @body()
    refreshToken!: string
}

export class PostRegisterPayload extends PostUserLoginPayload implements registerRequest {}

export class PostUserGoogleTokenPayload {
    @body()
    code!: string
}

export class PostUserInterestPayload {
    @body()
    interest!: string
}
