import axios from 'axios'
import { HttpClientException } from '@/types/errors'
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

export class Kakao {
    public static async getUserInfo(payload: OAuthPayload) {
        const { data } = await axios('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${payload.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).catch(e => {
            throw new HttpClientException(e)
        })

        return {
            nickname: data.kakao_account.profile.nickname,
            provider: 'KAKAO',
            providerId: data.id,
        }
    }
}

export class JWTProvider {
    public static issueJwt(user: User): string {
        return jwt.sign({ issuer: 'FIENMEE', user: user }, JWT_PRIVATE_KEY, { expiresIn: '30m' })
    }
}
