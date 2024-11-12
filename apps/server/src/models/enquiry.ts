import mongoose from 'mongoose'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Enquiry extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public userId: string

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
