export interface IMakeNewScheduleRequest {
    name: string
    eventId?: string // 개인 일정 등록 또는 연결 이벤트 지정
    startDate: Date
    endDate: Date
    address?: string
    location?: {
        type: string
        coordinates: number[]
    }
    description: string
    images?: string[]
}
export interface IMakeNewScheduleResponse {
    scheduleId: string
}

export interface IScheduleItem {
    _id: string
    eventId: string
    name: string
    startDate: Date
    endDate: Date
    images: string[]
}

export interface IGetScheduleListResponse {
    schedules: IScheduleItem[]
    page: {
        totalDocs: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
    }
}

type CalendarDate = Date | null

export type CalendarDateRange = CalendarDate | [CalendarDate, CalendarDate]
