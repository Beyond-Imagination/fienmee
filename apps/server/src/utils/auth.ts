import { User } from '@/models/user'
import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '@/config'

export interface OAuthPayload {
    accessToken: string
    provider: string
}

export interface IUserInfo {
    nickname: string
    provider: string
    providerId: string
}

export class JWTProvider {
    public static issueJwt(user: User): string {
        return jwt.sign({ issuer: 'FIENMEE', user: user }, JWT_PRIVATE_KEY, { expiresIn: '30m' })
    }
}
