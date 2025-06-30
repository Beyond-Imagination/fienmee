export interface IDocument {
    name: string
    required: boolean
    path: string
}

export interface getAgreementsResponse {
    documents: IDocument[]
}
