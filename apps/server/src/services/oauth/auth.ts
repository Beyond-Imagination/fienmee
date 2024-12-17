import { ICredentials, IOAuth, IUser } from '@/types/oauth'
import { Kakao } from '@/services/oauth/kakao'
import { UnknownProviderError } from '@/types/errors/oauth'

export async function getOAuthUser(credential: ICredentials): Promise<IUser> {
    const provider = getOAuthProvider(credential.provider)
    return provider.getUser(credential)
}

function getOAuthProvider(provider: string): IOAuth {
    switch (provider) {
        case 'KAKAO':
            return new Kakao()
        default:
            throw new UnknownProviderError(provider)
    }
}
