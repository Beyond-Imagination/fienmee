import { getModelForClass, plugin, prop, ReturnModelType, defaultClasses } from '@typegoose/typegoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from 'mongoose'

import { User, Events } from '@/models'

@plugin(mongoosePaginate)
export class Schedule extends defaultClasses.TimeStamps {
    static paginate: mongoose.PaginateModel<typeof Schedule>['paginate']

    public _id: mongoose.Types.ObjectId

    @prop({ required: true, ref: User })
    public authorId: mongoose.Types.ObjectId

    @prop({ ref: Events })
    public eventId: mongoose.Types.ObjectId

    @prop()
    public name: string

    @prop({ validate: { validator: v => v.type === 'Point' && v.coordinates?.length === 2 } })
    public location: {
        type: string
        coordinates: number[]
    }

    @prop()
    public address: string

    @prop({ required: true })
    public startDate: Date

    @prop({ required: true })
    public endDate: Date

    @prop()
    public description: string

    @prop()
    public images: string[]

    @prop()
    public createdAt: Date

    public static async findByUserId(
        this: ReturnModelType<typeof Schedule>,
        userId: string,
        filterOption: {
            from: Date
            to: Date
        },
        options: {
            page: number
            limit: number
        },
    ) {
        return await this.paginate({ authorId: userId, startDate: { $lte: filterOption.to }, endDate: { $gte: filterOption.from } }, options)
    }
}

export const ScheduleModel = getModelForClass(Schedule)
