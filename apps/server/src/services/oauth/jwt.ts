import jwt from 'jsonwebtoken'

import { User } from '@/models/user'
import { JWT_EXPIRES_IN_MS, JWT_SECRET } from '@/config'
import { InvalidRequestTokenError } from '@/types/errors/jwt/auth'
import { LRUCache } from 'lru-cache'

export function issueJwt(user: User): string {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN_MS / 1000 })
}

export function expireJwt(jwt: string) {
    if (!jwt) {
        throw new InvalidRequestTokenError('jwt must be provided')
    }
    tokenBlackList.set(`ACCESS_${jwt}`, new Date()) // 로그아웃 시점을 기록
}

const tokenBlackList = new LRUCache({ ttl: JWT_EXPIRES_IN_MS })

export function isTokenInBlackList(jwt: string): boolean {
    if (!jwt) {
        throw new InvalidRequestTokenError('jwt must be provided')
    }
    return tokenBlackList.has(`ACCESS_${jwt}`)
}
