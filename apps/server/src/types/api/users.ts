export interface loginRequest {
    accessToken: string
    refreshToken: string
    provider: string
}

export interface loginResponse {
    accessToken: string
}

export interface registerRequest {
    accessToken: string
    refreshToken: string
    provider: string
}

export interface registerResponse {
    accessToken: string
}
