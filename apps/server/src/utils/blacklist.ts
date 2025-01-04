import { LRUCache } from 'lru-cache'
import { JWT_EXPIRES_IN_MS } from '@/config'
import { ITokenInfo } from '@/types/oauth'
import { InvalidRequestTokenError } from '@/types/errors/jwt/auth'

const tokenBlackList = new LRUCache({ ttl: JWT_EXPIRES_IN_MS })

export function addToBlackList(tokenInfo: ITokenInfo) {
    if (!tokenInfo.accessToken && !tokenInfo.refreshToken) {
        throw new InvalidRequestTokenError('At least one of the refresh token and access token must be provided.')
    }

    if (tokenInfo.accessToken) {
        const ACCESS_TOKEN_PREFIX = `ACCESS_${tokenInfo.accessToken}`
        tokenBlackList.set(ACCESS_TOKEN_PREFIX, new Date()) // 로그아웃 시점을 기록
    }

    if (tokenInfo.refreshToken) {
        const REFRESH_TOKEN_PREFIX = `REFRESH_${tokenInfo.refreshToken}`
        tokenBlackList.set(REFRESH_TOKEN_PREFIX, new Date())
    }
}

export function isTokenInBlackList(tokenInfo: ITokenInfo): boolean {
    if (tokenInfo.accessToken && tokenInfo.refreshToken) {
        return tokenBlackList.has(`ACCESS_${tokenInfo.accessToken}`) && tokenBlackList.has(`REFRESH_${tokenInfo.refreshToken}`)
    } else if (tokenInfo.accessToken && !tokenInfo.refreshToken) {
        return tokenBlackList.has(`ACCESS_${tokenInfo.accessToken}`)
    } else if (!tokenInfo.accessToken && tokenInfo.refreshToken) {
        return tokenBlackList.has(`REFRESH_${tokenInfo.refreshToken}`)
    } else {
        throw new InvalidRequestTokenError('At least one of the refresh token and access token must be provided.')
    }
}
