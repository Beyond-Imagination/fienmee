import { array, body, defaultValue, equal, params, query, validate } from 'express-cargo'

export class LocationType {
    @body()
    @equal('Point')
    type: string

    @body()
    @array(Number)
    @validate(value => Array.isArray(value) && value.length === 2)
    coordinates: number[]
}

export class PaginationPayload {
    @query()
    @defaultValue(1)
    page!: number

    @query()
    @defaultValue(10)
    limit!: number
}

export class IdPayload {
    @params()
    id: string
}
