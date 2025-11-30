import { array, body, defaultValue, oneOf, optional, params, query, range, virtual } from 'express-cargo'
import { IPostEventRequestBody } from '@fienmee/types'
import { IdPayload, LocationType, PaginationPayload } from './common'

export class EventBasePayload implements IPostEventRequestBody {
    @body()
    name: string

    @body()
    address!: string

    @body()
    location!: LocationType

    @body()
    startDate!: Date

    @body()
    endDate!: Date

    @body()
    @array(String)
    photo!: string[]

    @body()
    cost!: string

    @body()
    description!: string

    @body()
    @array(String)
    category!: string[]

    @body()
    @array(String)
    targetAudience!: string[]

    @body()
    isAllDay!: boolean
}

export class EventIdPayload extends IdPayload {}

export class EventCommentIdPayload extends EventIdPayload {
    @params()
    commentId!: string
}

export class PostEventPayload extends EventBasePayload {}

export class GetEventSearchPayload extends PaginationPayload {
    @query()
    q!: string

    @query()
    @oneOf(['default', 'name', 'address'])
    @defaultValue('default')
    target!: string

    @query()
    @oneOf(['default', 'hot', 'startDate', 'endDate'])
    @defaultValue('default')
    sort!: string

    @query()
    @optional()
    category?: string

    @query()
    @defaultValue(new Date())
    startDate!: Date

    @query()
    @optional()
    endDate?: Date

    @query()
    @defaultValue(false)
    isAllDay!: boolean

    @virtual((obj: GetEventSearchPayload) => (obj.page - 1) * obj.limit)
    skip!: number
}

export class PutEventPayload extends EventBasePayload {
    @params()
    id!: string
}

export class PostEventReviewPayload extends EventIdPayload {
    @body()
    @range(1, 5)
    rating!: number

    @body()
    @array(String)
    photo!: string[]

    @body()
    body!: string
}

export class GetEventReviewPayload extends PaginationPayload {
    @params()
    id!: string
}

export class PostEventCommentPayload extends EventIdPayload {
    @body()
    comment!: string
}

export class GetEventCommentPayload extends PaginationPayload {
    @params()
    id!: string
}

export class PutEventCommentPayload extends EventCommentIdPayload {
    @body()
    comment!: string
}

export class GetEventDateCategoryPayload {
    @query()
    @optional()
    from: Date

    @query()
    @optional()
    to: Date

    @query()
    @defaultValue(1)
    page!: number

    @query()
    @defaultValue(0)
    limit!: number
}

export class GetEventHotCategoryPayload {
    @query()
    @optional()
    from: Date

    @query()
    @optional()
    to: Date

    @query()
    @defaultValue(1)
    page!: number

    @query()
    @defaultValue(3)
    limit!: number
}

export class GetEventInterestCategoryPayload {
    @query()
    @defaultValue(1)
    page!: number

    @query()
    @defaultValue(3)
    limit!: number
}

export class GetEventCategoryPayload extends PaginationPayload {
    @params()
    category!: string
}
