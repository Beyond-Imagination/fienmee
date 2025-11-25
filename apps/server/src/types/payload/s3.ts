import { query } from 'express-cargo'

export class GetS3UploadUrlPayload {
    @query()
    fileName!: string
}

export class GetS3ViewUrlPayload {
    @query()
    key!: string
}
