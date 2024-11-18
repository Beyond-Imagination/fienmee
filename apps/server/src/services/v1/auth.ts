import { User, UserModel } from '@/models/user'
import { KakaoProfile, GoogleProfile } from '@/types/oauth.profile'
import jwt from 'jsonwebtoken'
import config from '@/config'

type OAuthProfile = KakaoProfile | GoogleProfile

export const findUserByProvider = async (provider: string, providerId: string): Promise<User | null> => {
    return await UserModel.findOne({ provider: provider, providerId: providerId }).exec()
}

export const findOrCreateUser = async (provider: string, profile: OAuthProfile): Promise<User> => {
    const providerId = profile.id

    let user = await findUserByProvider(provider, providerId)

    if (!user) {
        let nickname: string

        switch (provider) {
            case 'kakao':
                nickname = profile.displayName
                break
            case 'google':
                nickname = profile.displayName
                break
            default:
                throw new Error('Unsupported provider')
        }

        user = await UserModel.create({
            nickname,
            provider,
            providerId,
        })
    }

    return user
}

export const generateJWT = async (user: User): Promise<string> => {
    const payload = {
        id: user._id,
        nickname: user.nickname,
    }

    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
}
