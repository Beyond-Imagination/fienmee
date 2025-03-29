import { getModelForClass, plugin, prop, defaultClasses } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { Events, User } from '@/models'

@plugin(mongoosePaginate)
export class Comments extends defaultClasses.TimeStamps {
    static paginate: mongoose.PaginateModel<typeof Comments>['paginate']

    public _id: mongoose.Types.ObjectId

    @prop({ ref: User, required: true })
    public userId: mongoose.Types.ObjectId

    @prop({ required: true })
    public nickname: string

    @prop({ ref: Events, required: true })
    public eventId: mongoose.Types.ObjectId

    @prop()
    public comment: string

    @prop()
    public createdAt: Date

    @prop()
    public updatedAt: Date

    public toJSON(): object {
        return {
            _id: this._id,
            userId: this.userId,
            nickname: this.nickname,
            eventId: this.eventId,
            comment: this.comment,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}

export const CommentsModel = getModelForClass(Comments)
