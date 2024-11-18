import { User, UserModel } from '@/models/user'

export const findUserById = async (id: string): Promise<User | null> => {
    return await UserModel.findById(id)
}
