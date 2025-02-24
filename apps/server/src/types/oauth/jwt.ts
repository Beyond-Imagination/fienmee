export interface IJwtPayload {
    userId: string
    type: string
    expiresAt: Date
}

export interface IAccessTokenResult {
    accessToken: string
    accessTokenExpiresAt: Date
}

export interface IRefreshTokenResult {
    refreshToken: string
    refreshTokenExpiresAt: Date
}
