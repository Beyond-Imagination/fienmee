export interface IDocument {
    name: string
    required: boolean
    link: string
}

export interface getAgreementsResponse {
    documents: IDocument[]
}
