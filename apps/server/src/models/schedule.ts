import { getModelForClass, plugin, prop, ReturnModelType } from '@typegoose/typegoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from 'mongoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

import { User } from '@/models/user'
import { Events } from '@/models/event'

@plugin(mongoosePaginate)
export class Schedule extends TimeStamps {
    static paginate: mongoose.PaginateModel<typeof Schedule>['paginate']

    public _id: mongoose.Types.ObjectId

    @prop({ required: true, ref: User })
    public authorId: mongoose.Types.ObjectId

    @prop({ required: true, ref: Events })
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
        options: {
            page: number
            limit: number
        },
    ) {
        return await this.paginate({ authorId: userId }, options)
    }
}

export const ScheduleModel = getModelForClass(Schedule)
