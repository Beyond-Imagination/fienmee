import { ICredentials, IOAuth, IUser } from '@/types/oauth'
import { Kakao, Google } from '@/services/oauth'
import { UnknownProviderError } from '@/types/errors/oauth'
import { User, UserModel } from '@/models'

export async function getOAuthUser(credential: ICredentials): Promise<IUser> {
    const provider = getOAuthProvider(credential.provider)
    return provider.getUser(credential)
}

function getOAuthProvider(provider: string): IOAuth {
    switch (provider) {
        case 'KAKAO':
            return new Kakao()
        case 'GOOGLE':
            return new Google()
        default:
            throw new UnknownProviderError(provider)
    }
}

export async function unlinkUser(user: User): Promise<void> {
    const provider = getOAuthProvider(user.provider)
    await provider.unlinkUser(user)

    user.isDeleted = true
    await UserModel.updateUserDeletionStatus(user)
}
