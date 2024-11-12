import { getModelForClass, prop, index } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

@index({ location: '2dsphere' })
export class Schedule extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public authorId: string

    @prop({ required: true })
    public eventId: string

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
}

export const ScheduleModel = getModelForClass(Schedule)
