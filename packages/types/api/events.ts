import { ICategory } from './category'

export interface IEvent {
    _id: string
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
    likeCount: number
    commentCount: number
    category: ICategory[]
    targetAudience: string[]
    createdAt: Date
    isAuthor: boolean
    isAllDay: boolean
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

export interface IPostEventRequest {
    body: {
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
        likeCount: number
        commentCount: number
        category: string[]
        targetAudience: string[]
        createdAt: Date
        isAllDay: boolean
    }
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

export interface IPostReviewResponse {
    reviewId: string
}

export interface IPostEventCommentRequest {
    eventId: string
    comment: string
}
