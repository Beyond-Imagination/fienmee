export interface IEnquiry {
    _id: string
    userId: string
    title: string
    body: string
    createdAt: Date
}

export interface IEnquiryFormInputs {
    title: string
    body: string
}

export interface IPostEnquiryRequest {
    body: IEnquiryFormInputs
}

export interface IPostEnquiryResponse {
    enquiryId: string
}

export interface IGetEnquiriesResponse {
    enquiries: IEnquiry[]
    page: {
        totalDocs: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        page: number
        limit: number
    }
}
