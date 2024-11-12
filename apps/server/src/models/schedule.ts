import { getModelForClass, prop } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Schedule extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public authorId: string

    @prop({ required: true })
    public eventId: string

    @prop()
    public name: string

    @prop()
    public location: number[]

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
