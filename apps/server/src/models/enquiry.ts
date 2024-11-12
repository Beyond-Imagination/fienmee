import mongoose from 'mongoose'
import { getModelForClass, prop } from '@typegoose/typegoose'

export class Enquiry {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public userId: string

    @prop()
    public title: string

    @prop()
    public body: string

    @prop({ default: new Date() })
    public createdAt: Date

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
