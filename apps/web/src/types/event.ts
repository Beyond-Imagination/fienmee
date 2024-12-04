export interface IEvent {
    _id: string
    name: string
    location: {
        type: string
        coordinates: number[]
    }
    startDate: Date
    endDate: Date
    description: string
    photo: string[]
    cost: number
    likeCount: number
    commentCount: number
    category: string[]
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
