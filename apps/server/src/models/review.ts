import mongoose from 'mongoose'
import { defaultClasses, getModelForClass, plugin, prop, ReturnModelType } from '@typegoose/typegoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { Events, User } from '@/models'

@plugin(mongoosePaginate)
export class Reviews extends defaultClasses.TimeStamps {
    static paginate: mongoose.PaginateModel<typeof Reviews>['paginate']

    public _id: mongoose.Types.ObjectId

    @prop({ ref: User, required: true })
    public userId: mongoose.Types.ObjectId

    @prop({ ref: Events, required: true })
    public eventId: mongoose.Types.ObjectId

    @prop({ required: true, min: 1, max: 5 })
    public rating: number

    @prop()
    public photo: string[]

    @prop({ required: true })
    public body: string

    public toJSON(): object {
        return {
            _id: this._id,
            userId: this.userId,
            eventId: this.eventId,
            rating: this.rating,
            body: this.body,
            photo: this.photo,
            createdAt: this.createdAt,
        }
    }

    public static async findByEventId(
        this: ReturnModelType<typeof Reviews>,
        eventId: mongoose.Types.ObjectId,
        options: mongoose.PaginateOptions,
    ): Promise<mongoose.PaginateResult<mongoose.PaginateDocument<typeof Reviews, object, object, mongoose.PaginateOptions>>> {
        return await this.paginate(
            { eventId },
            {
                ...options,
                populate: {
                    path: 'userId',
                    select: 'nickname',
                    model: 'User',
                },
            },
        )
    }
}

export const ReviewsModel = getModelForClass(Reviews)
