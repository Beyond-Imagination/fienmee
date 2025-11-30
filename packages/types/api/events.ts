import { ICategory } from './category'

export interface IEventBase {
    name: string
    address: string
    location: {
        type: string
        coordinates: number[]
    }
    startDate: Date
    endDate: Date
    description: string
    photo: string[]
    cost: string
    targetAudience: string[]
    isAllDay: boolean
}

export interface IEvent extends IEventBase {
    _id: string
    likeCount: number
    commentCount: number
    category: ICategory[]
    createdAt: Date
    isAuthor: boolean
    isLiked: boolean
}

export interface IGetEventsByCategoryResponse {
    page: {
        totalDocs: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        page: number
        limit: number
    }
    events: IEvent[]
}

export interface IPostEventRequestBody extends IEventBase {
    category: string[]
}

export interface IPostEventRequest {
    body: IPostEventRequestBody
}

export interface IPutEventRequest extends IPostEventRequest {
    uri: {
        _id: string
    }
}

export interface IReviewFormInputs {
    rating: boolean[]
    photo: string[]
    body: string
}

export interface IPostReviewRequest {
    uri: {
        id: string
    }
    body: {
        rating: number
        photo: string[]
        body: string
    }
}

export interface IPostEventCommentRequest {
    eventId: string
    comment: string
}

export interface IPutEventCommentRequest {
    uri: {
        eventId: string
        commentId: string
    }
    body: {
        comment: string
    }
}

export interface IComment {
    _id: string
    eventId: string
    comment: string
    isAuthor: boolean
    createdAt: Date
    updatedAt: Date
    userId: {
        _id: string
        nickname: string
        isDeleted: boolean
    }
    likeCount: number
    isLiked: boolean
}

export interface IGetEventCommentsResponse {
    page: {
        totalDocs: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        page: number
        limit: number
    }
    comments: IComment[]
}

export interface IDeleteCommentRequest {
    eventId: string
    commentId: string
}
