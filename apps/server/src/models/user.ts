import mongoose from 'mongoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'
import { IUser } from '@/types/oauth'

export class User extends TimeStamps implements IUser {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public nickname: string

    @prop()
    public provider: string

    @prop()
    public providerId: string

    @prop()
    public accessToken: string

    @prop()
    public refreshToken: string

    @prop({ default: Date.now() })
    public lastLoggedInAt: Date

    public toJSON() {
        return {
            _id: this._id,
            nickname: this.nickname,
            provider: this.provider,
        }
    }

    public static async createUser(this: ReturnModelType<typeof User>, user: IUser): Promise<User> {
        return await this.create(user)
    }

    public static async findByProviderId(this: ReturnModelType<typeof User>, providerId: string): Promise<User> {
        return await this.findOne({ providerId: providerId }).exec()
    }

    public static async updateLogIn(this: ReturnModelType<typeof User>, user: User) {
        return await this.findOneAndUpdate(
            { _id: user._id },
            { accessToken: user.accessToken, refreshToken: user.refreshToken, lastLoggedInAt: Date.now() },
        ).exec()
    }
}

export const UserModel = getModelForClass(User)
