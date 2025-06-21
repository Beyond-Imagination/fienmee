import fetch from 'node-fetch'

import {
    GoogleNetworkError,
    GoogleUserInformationError,
} from '@/types/errors'
import { ICredentials, IOAuth, IUser, getUserFromGoogleResponse } from '@/types/oauth'

export class Google implements IOAuth {
    public async getUser(credential: ICredentials): Promise<IUser> {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${credential.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).catch(e => {
            throw new GoogleUserInformationError(e)
        })

        const data = (await response.json()) as getUserFromGoogleResponse

        return {
            ...credential,
            nickname: data.name,
            providerId: data.sub,
        }
    }

    public async unlinkUser(credential: ICredentials): Promise<void> {
        await fetch('https://oauth2.googleapis.com/revoke', {
            method: 'POST',
            headers: {
                Authorization: `Token=${credential.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).catch(e => {
            throw new GoogleNetworkError(e)
        })
    }
}
