export interface IMakeNewScheduleRequest {
    name: string
    eventId?: string // 개인 일정 등록 또는 연결 이벤트 지정
    isAllDay: boolean
    startDate: Date
    endDate: Date
    address?: string
    location?: {
        type: string
        coordinates: number[]
    }
    description: string
}
export interface IMakeNewScheduleResponse {
    scheduleId: string
}

export interface IScheduleItem {
    _id: string
    authorId: string
    eventId: string
    name: string
    location: {
        type: string
        coordinates: number[]
    }
    startDate: Date
    endDate: Date
    description: string
}

export interface IGetScheduleListResponse {
    docs: IScheduleItem[]
    totalDocs: number
    totalPages: number
    limit: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
}

type CalendarDate = Date | null

export type CalendarDateRange = CalendarDate | [CalendarDate, CalendarDate]
