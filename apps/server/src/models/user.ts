import mongoose from 'mongoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'
import { IUserCredentials, IUserInfo } from '@/utils/auth'

export class User extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public nickname: string

    @prop()
    public provider: string

    @prop()
    public providerId: string

    @prop()
    public providerAccessToken: string

    @prop()
    public providerRefreshToken: string

    public toJSON() {
        return {
            _id: this._id,
            nickname: this.nickname,
            provider: this.provider,
        }
    }

    public static async findByProviderId(this: ReturnModelType<typeof User>, providerId: string) {
        return await this.findOne({ providerId: providerId }).exec()
    }

    public static async createUser(this: ReturnModelType<typeof User>, info: IUserInfo) {
        return await this.create(info)
    }

    public static async setProviderCredentials(this: ReturnModelType<typeof User>, credentials: IUserCredentials) {
        return await this.findOneAndUpdate(
            { providerId: credentials.providerId },
            { providerAccessToken: credentials.providerAccessToken, providerRefreshToken: credentials.providerRefreshToken },
        ).exec()
    }
}

export const UserModel = getModelForClass(User)
