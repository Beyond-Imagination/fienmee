export interface ICredential {
    accessToken: string
    accessTokenExpiresAt: Date
    refreshToken: string
    refreshTokenExpiresAt: Date
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

export interface refreshRequest {
    refreshToken: string
}

export interface refreshResponse {
    accessToken: string
    accessTokenExpiresAt: Date
    refreshToken?: string
    refreshTokenExpiresAt?: Date
}
