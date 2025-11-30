import { IdPayload, PaginationPayload } from '@/types/payload/common'
import { body, oneOf } from 'express-cargo'
import { INotificationToken, PlatformType } from '@fienmee/types'

const platforms = Object.values(PlatformType).filter(value => !isNaN(Number(value)))

export class GetNotificationPayload extends PaginationPayload {}

export class PutNotificationTokenPayload implements INotificationToken {
    @body()
    deviceId!: string

    @body()
    token!: string

    @body()
    @oneOf(platforms)
    platform!: number
}

export class PostNotificationReadPayload extends IdPayload {}
