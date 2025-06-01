import mongoose from 'mongoose'
import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose'
import { PlatformType } from '@fienmee/types/api/notification'

import { User } from '@/models/user'

export class NotificationToken extends defaultClasses.TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ ref: User })
    public userId: mongoose.Types.ObjectId

    @prop({ required: true })
    public token: string

    @prop({ required: true, unique: true })
    public deviceId: string

    @prop({ required: true, enum: Object.values(PlatformType).filter(v => typeof v === 'number') })
    public platform: number

    public toJSON(): object {
        return {
            _id: this._id,
            userId: this.userId,
            platform: this.platform,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

export const NotificationTokenModel = getModelForClass(NotificationToken)
