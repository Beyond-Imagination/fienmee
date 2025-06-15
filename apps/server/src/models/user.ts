import mongoose from 'mongoose'
import { getModelForClass, prop, ReturnModelType, defaultClasses } from '@typegoose/typegoose'
import { IUser } from '@/types/oauth'

import { Category } from '@/models/category'

export class User extends defaultClasses.TimeStamps implements IUser {
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

    @prop({ ref: () => Category, type: () => [String], default: [] })
    public interests: mongoose.Types.Array<Category>

    @prop({ default: Date.now() })
    public lastLoggedInAt: Date

    @prop({ default: false })
    public isDeleted: boolean

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

    public static async updateUserDeletionStatus(this: ReturnModelType<typeof User>, user: User) {
        return await this.findOneAndUpdate({ _id: user._id }, { isDeleted: user.isDeleted }).exec()
    }
}

export const UserModel = getModelForClass(User)
