import jwt from 'jsonwebtoken'
import { LRUCache } from 'lru-cache'

import { User } from '@/models/user'
import { ACCESS_TOKEN_EXPIRES_IN_MS, JWT_SECRET, REFRESH_TOKEN_EXPIRES_IN_MS } from '@/config'
import { InvalidRequestTokenError } from '@/types/errors/jwt/auth'
import { IJwtPayload } from '@/types/oauth'

export function issueAccessToken(user: User): string {
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + ACCESS_TOKEN_EXPIRES_IN_MS / 1000)
    const payload: IJwtPayload = {
        userId: user._id.toString(),
        type: 'access_token',
        expiresAt: expiresAt,
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN_MS / 1000 })
}

export function issueRefreshToken(user: User): string {
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 2)
    const payload: IJwtPayload = {
        userId: user._id.toString(),
        type: 'refresh_token',
        expiresAt: expiresAt,
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN_MS / 1000 })
}

export function expireJwt(jwt: string) {
    if (!jwt) {
        throw new InvalidRequestTokenError('jwt must be provided')
    }
    tokenBlackList.set(`ACCESS_${jwt}`, new Date()) // 로그아웃 시점을 기록
}

const tokenBlackList = new LRUCache({ ttl: REFRESH_TOKEN_EXPIRES_IN_MS })

export function isTokenInBlackList(jwt: string): boolean {
    if (!jwt) {
        throw new InvalidRequestTokenError('jwt must be provided')
    }
    return tokenBlackList.has(`ACCESS_${jwt}`)
}
