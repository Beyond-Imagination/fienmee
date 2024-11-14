import { getModelForClass, prop } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { User } from '@/models/user'

export class Events extends TimeStamps {
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
    public createdAt: Date

    @prop()
    public cost: number

    @prop()
    public comments: mongoose.Types.ObjectId[]

    @prop()
    public category: string[]

    @prop()
    public targetAudience: string[]
}

export const EventsModel = getModelForClass(Events)
