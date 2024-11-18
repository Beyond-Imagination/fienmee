import mongoose from 'mongoose'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class User extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public nickname!: string

    @prop({ required: true })
    public provider!: string

    @prop({ required: true })
    public providerId!: string
}

export const UserModel = getModelForClass(User)
