import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { getModelForClass, prop, defaultClasses, ReturnModelType, plugin } from '@typegoose/typegoose'

import { User } from '@/models'

@plugin(mongoosePaginate)
export class Enquiry extends defaultClasses.TimeStamps {
    static paginate: mongoose.PaginateModel<typeof Enquiry>['paginate']

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

    public static async findByUser(
        this: ReturnModelType<typeof Enquiry>,
        user: mongoose.Types.ObjectId,
        options: mongoose.PaginateOptions,
    ): Promise<mongoose.PaginateResult<mongoose.PaginateDocument<typeof Enquiry, object, object, mongoose.PaginateOptions>>> {
        const oneYearAgo = new Date()
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
        return await this.paginate({ userId: user, createdAt: { $gte: oneYearAgo } }, options)
    }
}

export const EnquiryModel = getModelForClass(Enquiry)
