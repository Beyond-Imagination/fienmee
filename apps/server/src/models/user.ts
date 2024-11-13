import mongoose from 'mongoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { getModelForClass, prop } from '@typegoose/typegoose'

export class User extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public id: string

    @prop({ required: true })
    public nickname: string

    @prop()
    public provider: string

    @prop()
    public providerId: string
}

export const UserModel = getModelForClass(User)
