import jwt from 'jsonwebtoken'
import { LRUCache } from 'lru-cache'

import { User } from '@/models/user'
import { ACCESS_TOKEN_EXPIRES_IN_MS, JWT_SECRET, REFRESH_TOKEN_EXPIRES_IN_MS } from '@/config'
import { InvalidRequestTokenError } from '@/types/errors/jwt/auth'

export function issueAccessToken(user: User): string {
    return jwt.sign({ userId: user._id, type: 'access_token' }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN_MS / 1000 })
}

export function issueRefreshToken(user: User): string {
    return jwt.sign({ userId: user._id, type: 'refresh_token' }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN_MS / 1000 })
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
