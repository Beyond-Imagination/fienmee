import mongoose from 'mongoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'
import { IUserInfo } from '@/utils/auth'

export class User extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public nickname: string

    @prop()
    public provider: string

    @prop()
    public providerId: string

    public toJSON() {
        return {
            _id: this._id,
            nickname: this.nickname,
            provider: this.provider,
        }
    }

    public static async loadOrCreateUser(this: ReturnModelType<typeof User>, info: IUserInfo) {
        let user = await this.findOne({ providerId: info.providerId }).exec()
        if (!user) {
            user = await this.create(info)
        }
        return user
    }
}

export const UserModel = getModelForClass(User)
