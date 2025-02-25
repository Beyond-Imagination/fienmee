import fetch from 'node-fetch'

import { KakaoNetworkError, KakaoUserInformationError } from '@/types/errors'
import { ICredentials, IOAuth, IUser, getUserMeResponse } from '@/types/oauth'

export class Kakao implements IOAuth {
    public async getUser(credential: ICredentials): Promise<IUser> {
        const response = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${credential.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).catch(e => {
            throw new KakaoUserInformationError(e)
        })

        const data = (await response.json()) as getUserMeResponse

        return {
            ...credential,
            nickname: data.kakao_account.profile.nickname,
            providerId: data.id,
        }
    }

    public async unlinkUser(credential: ICredentials): Promise<void> {
        await fetch('https://kapi.kakao.com/v1/user/unlink', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${credential.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).catch(e => {
            throw new KakaoNetworkError(e)
        })
    }
}
