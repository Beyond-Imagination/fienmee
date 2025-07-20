import { User, UserModel } from '@/models'
import { IUser } from '@/types/oauth'

export async function registerUser(oauthUser: IUser): Promise<User> {
    let user = await UserModel.findByProviderId(oauthUser.providerId)
    if (user && user.isDeleted) {
        user.isDeleted = false
        await UserModel.updateUserDeletionStatus(user)
    } else if (!user) {
        user = await UserModel.createUser(oauthUser)
    }
    return user
}

export async function deleteOldDeletedUsers(): Promise<number> {
    return UserModel.removeDeletedUserInfo()
}
