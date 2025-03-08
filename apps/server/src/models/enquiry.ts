import mongoose from 'mongoose'
import { getModelForClass, prop, defaultClasses } from '@typegoose/typegoose'

import { User } from '@/models'

export class Enquiry extends defaultClasses.TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true, ref: User })
    public userId: mongoose.Types.ObjectId

    @prop()
    public title: string

    @prop()
    public body: string

    public toJSON(): object {
        return {
            _id: this._id,
            userId: this.userId,
            title: this.title,
            body: this.body,
            createdAt: this.createdAt,
        }
    }
}

export const EnquiryModel = getModelForClass(Enquiry)
