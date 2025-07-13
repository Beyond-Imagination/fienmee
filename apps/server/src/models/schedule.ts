import { getModelForClass, plugin, prop, ReturnModelType, defaultClasses, modelOptions, Severity } from '@typegoose/typegoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose from 'mongoose'

import { User, Events } from '@/models'
import { IDailyScheduleCount } from '@fienmee/types/api'

@plugin(mongoosePaginate)
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Schedule extends defaultClasses.TimeStamps {
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
    public createdAt: Date

    @prop()
    public isAllDay: boolean

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

    public static async findDailyCountByUserId(
        this: ReturnModelType<typeof Schedule>,
        user: User,
        from: Date,
        to: Date,
    ): Promise<IDailyScheduleCount[]> {
        return this.aggregate([
            {
                $match: {
                    authorId: user._id,
                    startDate: { $gte: from, $lt: to },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$startDate' },
                        month: { $month: '$startDate' },
                        day: { $dayOfMonth: '$startDate' },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: {
                                $dateFromParts: {
                                    year: '$_id.year',
                                    month: '$_id.month',
                                    day: '$_id.day',
                                },
                            },
                        },
                    },
                    count: 1,
                },
            },
        ])
    }
}

export const ScheduleModel = getModelForClass(Schedule)
