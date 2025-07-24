import { getModelForClass, plugin, prop, ReturnModelType, defaultClasses, modelOptions, Severity } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

import { Category, User } from '@/models'

@plugin(mongoosePaginate)
@plugin(aggregatePaginate)
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Events extends defaultClasses.TimeStamps {
    static paginate: mongoose.PaginateModel<typeof Events>['paginate']
    static aggregatePaginate: mongoose.AggregatePaginateModel<typeof Events>['aggregatePaginate']

    public _id: mongoose.Types.ObjectId

    @prop()
    public name: string

    @prop({ ref: User })
    public authorId: mongoose.Types.ObjectId

    @prop()
    public address: string

    @prop({ validate: { validator: v => v.type === 'Point' && v.coordinates?.length === 2 } })
    public location: {
        type: string
        coordinates: number[]
    }

    @prop({ required: true })
    public startDate: Date

    @prop({
        required: true,
        validate: {
            validator: function (this: Events, endDate: Date) {
                return this.isAllDay || this.startDate < endDate
            },
            message: 'endDate must be greater than startDate',
        },
    })
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

    @prop({ ref: () => Category, type: () => [String] })
    public category: string[]

    @prop()
    public targetAudience: string[]

    @prop({ default: false })
    public isAllDay: boolean

    public toJSON(): object {
        return {
            _id: this._id,
            name: this.name,
            authorId: this.authorId,
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
            isAllDay: this.isAllDay,
        }
    }

    public static async findByCategory(
        this: ReturnModelType<typeof Events>,
        category: string[],
        options: mongoose.PaginateOptions,
    ): Promise<mongoose.PaginateResult<mongoose.PaginateDocument<typeof Events, object, object, mongoose.PaginateOptions>>> {
        return await this.paginate(
            { category: { $in: category } },
            {
                ...options,
                populate: {
                    path: 'category',
                    select: 'title',
                    model: 'Category',
                },
            },
        )
    }

    public static async findByAuthor(
        this: ReturnModelType<typeof Events>,
        author: mongoose.Types.ObjectId,
        options: mongoose.PaginateOptions,
    ): Promise<mongoose.PaginateResult<mongoose.PaginateDocument<typeof Events, object, object, mongoose.PaginateOptions>>> {
        return await this.paginate(
            { authorId: author },
            {
                ...options,
                populate: {
                    path: 'category',
                    select: 'title',
                },
            },
        )
    }

    public static async findByDates(
        this: ReturnModelType<typeof Events>,
        from: Date,
        to: Date,
        limit?: number,
        page?: number,
    ): Promise<mongoose.PaginateResult<mongoose.PaginateDocument<typeof Events, object, object, mongoose.PaginateOptions>>> {
        const query = {
            $nor: [
                { endDate: { $lt: from } }, // 종료일이 검색 시작일보다 이전
                { startDate: { $gt: to } }, // 시작일이 검색 종료일보다 이후
            ],
        }

        return await this.paginate(query, {
            limit: limit,
            sort: { startDate: 1, endDate: 1, createdAt: -1 },
            page: page,
            populate: {
                path: 'category',
                select: 'title',
            },
        })
    }

    public static async findHot(
        this: ReturnModelType<typeof Events>,
        from: Date,
        to: Date,
        limit = 3,
        page = 1,
    ): Promise<mongoose.AggregatePaginateResult<mongoose.PaginateDocument<typeof Events, object, object, mongoose.PaginateOptions>>> {
        const pipeline: mongoose.PipelineStage[] = [
            {
                $match: {
                    $nor: [{ endDate: { $lt: from } }, { startDate: { $gt: to } }],
                },
            },
            {
                $addFields: {
                    likeCount: { $size: { $ifNull: ['$likes', []] } },
                },
            },
            {
                $sort: {
                    likeCount: -1,
                    startDate: 1,
                },
            },
        ]

        return await this.aggregatePaginate(this.aggregate(pipeline), {
            page,
            limit,
            populate: { path: 'category', select: 'title' },
        })
    }
}

export const EventsModel = getModelForClass(Events)
