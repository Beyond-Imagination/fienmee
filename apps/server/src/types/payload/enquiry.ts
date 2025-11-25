import { body } from 'express-cargo'
import { IEnquiryFormInputs } from '@fienmee/types'

export class PostEnquiryPayload implements IEnquiryFormInputs {
    @body()
    title: string

    @body()
    body: string
}
