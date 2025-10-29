export interface IReview {
    _id: string
    userId: {
        _id: string
        nickname: string
        isDeleted: boolean
    }
    rating: number
    body: string
    photo: string[]
    createdAt: Date
}

export interface IPostReviewResponse {
    reviewId: string
}

export interface IGetReviewResponse {
    page: {
        totalDocs: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        page: number
        limit: number
    }
    reviews: IReview[]
}
