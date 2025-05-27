import mongoose from 'mongoose'
import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose'
import { NotificationType } from '@fienmee/types/api/notification'

import { User } from '@/models/user'

export class Notification extends defaultClasses.TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true, ref: User })
    public userId: mongoose.Types.ObjectId

    @prop({ required: true, enum: Object.values(NotificationType).filter(v => typeof v === 'number') })
    public type: number

    @prop({ required: true })
    public title: string

    @prop({ required: true })
    public body: string

    @prop()
    public navigate: string

    @prop({ required: true, default: false })
    public isRead: boolean

    public toJSON() {
        return {
            _id: this._id,
            userId: this.userId,
            type: this.type,
            title: this.title,
            body: this.body,
            navigate: this.navigate,
            isRead: this.isRead,
            createdAt: this.createdAt,
        }
    }
}

export const NotificationModel = getModelForClass(Notification)
