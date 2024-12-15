import { OAuthUserInfoException } from '@/types/errors'
import { OAuthPayload } from '@/utils/auth'
import fetch from 'node-fetch'

export class Kakao {
    public static async getUserInfo(payload: OAuthPayload) {
        const response = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${payload.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).catch(e => {
            throw new OAuthUserInfoException(e)
        })

        const data = await response.json()

        return {
            nickname: data.kakao_account.profile.nickname,
            provider: 'KAKAO',
            providerId: data.id,
        }
    }
}

export default Kakao
