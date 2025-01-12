import { getModelForClass, plugin, prop, ReturnModelType, defaultClasses } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { User } from '@/models'

@plugin(mongoosePaginate)
export class Events extends defaultClasses.TimeStamps {
    static paginate: mongoose.PaginateModel<typeof Events>['paginate']

    public _id: mongoose.Types.ObjectId

    @prop()
    public name: string

    @prop()
    public address: string

    @prop({ validate: { validator: v => v.type === 'Point' && v.coordinates?.length === 2 } })
    public location: {
        type: string
        coordinates: number[]
    }

    @prop()
    public startDate: Date

    @prop()
    public endDate: Date

    @prop()
    public description: string

    @prop()
    public photo: string[]

    @prop({ ref: User })
    public likes: mongoose.Types.ObjectId[]

    @prop()
    public registeredAt: Date

    @prop()
    public cost: string

    @prop()
    public comments: mongoose.Types.ObjectId[]

    @prop()
    public category: string[]

    @prop()
    public targetAudience: string[]

    public toJSON(): object {
        // TODO: add isLiked
        return {
            _id: this._id,
            name: this.name,
            address: this.address,
            location: this.location,
            startDate: this.startDate,
            endDate: this.endDate,
            photo: this.photo,
            likeCount: this.likes.length,
            createdAt: this.createdAt,
            cost: this.cost,
            description: this.description,
            commentCount: this.comments.length,
            category: this.category,
            targetAudience: this.targetAudience,
        }
    }

    public static async findByCategory(
        this: ReturnModelType<typeof Events>,
        category: string,
        options: mongoose.PaginateOptions,
    ): Promise<mongoose.PaginateResult<mongoose.PaginateDocument<typeof Events, object, object, mongoose.PaginateOptions>>> {
        return await this.paginate({ category: category }, options)
    }
}

export const EventsModel = getModelForClass(Events)
