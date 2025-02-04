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
