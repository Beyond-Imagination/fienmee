export interface ICredential {
    accessToken: string
    refreshToken: string
}

export interface loginRequest {
    accessToken: string
    refreshToken: string
    provider: string
}

export type loginResponse = ICredential

export interface registerRequest {
    accessToken: string
    refreshToken: string
    provider: string
}

export type registerResponse = ICredential
