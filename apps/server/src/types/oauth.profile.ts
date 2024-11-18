import { Profile } from 'passport'

export interface KakaoProfile extends Profile {
    id: string
    displayName: string
    _json: {
        id: string
        properties: {
            nickname: string
        }
        kakao_account: {
            profile?: {
                nickname: string
            }
        }
    }
}

export interface GoogleProfile extends Profile {
    id: string
    displayName: string
    name: {
        familyName: string
        givenName: string
    }
}
