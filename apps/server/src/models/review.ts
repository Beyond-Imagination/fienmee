import mongoose from 'mongoose'
import { defaultClasses, getModelForClass, plugin, prop } from '@typegoose/typegoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { Events, User } from '@/models'

@plugin(mongoosePaginate)
export class Reviews extends defaultClasses.TimeStamps {
    public paginate: mongoose.PaginateModel<typeof Reviews>['paginate']

    public _id: mongoose.Types.ObjectId

    @prop({ ref: User, required: true })
    public userId: mongoose.Types.ObjectId

    @prop({ ref: Events, required: true })
    public eventId: mongoose.Types.ObjectId

    @prop({ required: true, min: 1, max: 5 })
    public rating: number

    @prop({ required: true })
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
}

export const ReviewsModel = getModelForClass(Reviews)
