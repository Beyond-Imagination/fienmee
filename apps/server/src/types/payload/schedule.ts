import { body, defaultValue, optional, query } from 'express-cargo'
import { IMakeNewScheduleRequest } from '@fienmee/types'
import { IdPayload, LocationType } from './common'

class GetSchedulePayloadBase {
    @query()
    @defaultValue(new Date(0))
    from!: Date

    @query()
    @defaultValue(new Date())
    to!: Date
}

export class PostSchedulePayload implements IMakeNewScheduleRequest {
    @body()
    name!: string

    @body()
    @optional()
    eventId?: string

    @body()
    isAllDay!: boolean

    @body()
    startDate!: Date

    @body()
    endDate!: Date

    @body()
    address!: string

    @body()
    location!: LocationType

    @body()
    description!: string
}

export class GetSchedulePayload extends GetSchedulePayloadBase {
    @query()
    @defaultValue(1)
    page!: number

    @query()
    @defaultValue(100)
    limit!: number
}

export class GetScheduleDailyCountPayload extends GetSchedulePayloadBase {
    @query()
    @defaultValue('Asia/Seoul')
    timezone!: string
}

export class PutSchedulePayload extends IdPayload {
    @body()
    name!: string

    @body()
    startDate!: Date

    @body()
    endDate!: Date

    @body()
    isAllDay!: boolean

    @body()
    address!: string

    @body()
    location!: LocationType

    @body()
    description!: string
}
