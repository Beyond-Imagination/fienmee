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
