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

type CalendarDate = Date | null

export type CalendarDateRange = CalendarDate | [CalendarDate, CalendarDate]

export interface IScheduleDocType {
    _id: string
    name: string
    startDate: Date
}
