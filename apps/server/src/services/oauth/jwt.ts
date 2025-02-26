import jwt from 'jsonwebtoken'
import { LRUCache } from 'lru-cache'

import { User } from '@/models/user'
import { ACCESS_TOKEN_EXPIRES_IN, JWT_SECRET, REFRESH_TOKEN_EXPIRES_IN } from '@/config'
import { InvalidRequestTokenError } from '@/types/errors/jwt/auth'
import { IAccessTokenResult, IJwtPayload, IRefreshTokenResult } from '@/types/oauth'

export function issueAccessToken(user: User): IAccessTokenResult {
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + ACCESS_TOKEN_EXPIRES_IN / 60)
    const payload: IJwtPayload = {
        userId: user._id.toString(),
        type: 'access_token',
        expiresAt: expiresAt,
    }
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN })
    return {
        accessToken: accessToken,
        accessTokenExpiresAt: expiresAt,
    }
}

export function issueRefreshToken(user: User): IRefreshTokenResult {
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + REFRESH_TOKEN_EXPIRES_IN / 60)
    const payload: IJwtPayload = {
        userId: user._id.toString(),
        type: 'refresh_token',
        expiresAt: expiresAt,
    }
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN })
    return {
        refreshToken: refreshToken,
        refreshTokenExpiresAt: expiresAt,
    }
}

export function expireJwt(jwt: string) {
    if (!jwt) {
        throw new InvalidRequestTokenError('jwt must be provided')
    }
    tokenBlackList.set(`ACCESS_${jwt}`, new Date(), { size: 1 }) // 로그아웃 시점을 기록
}

const tokenBlackList = new LRUCache({
    maxSize: 1000,
    ttl: REFRESH_TOKEN_EXPIRES_IN * 1000,
})

export function isTokenInBlackList(jwt: string): boolean {
    if (!jwt) {
        throw new InvalidRequestTokenError('jwt must be provided')
    }
    return tokenBlackList.has(`ACCESS_${jwt}`)
}
