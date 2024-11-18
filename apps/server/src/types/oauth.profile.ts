import { Profile } from 'passport'

export interface KakaoProfile extends Profile {
    id: string
    displayName: string
}

export interface GoogleProfile extends Profile {
    id: string
    displayName: string
    name: {
        familyName: string
        givenName: string
    }
}
