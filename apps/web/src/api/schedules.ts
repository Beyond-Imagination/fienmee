import { SERVER_URL } from '@/config'
import {
    IGetDailyScheduleCountResponse,
    IGetScheduleListResponse,
    IMakeNewScheduleRequest,
    IMakeNewScheduleResponse,
    IScheduleItem,
} from '@fienmee/types'

export async function getSchedulesByDate(date: Date, page: number, limit: number): Promise<IGetScheduleListResponse> {
    const tomorrow = new Date(date)
    tomorrow.setDate(date.getDate() + 1)
    const from = date.toISOString()
    const to = tomorrow.toISOString()

    const res = await fetch(`${SERVER_URL}/v1/schedules?page=${page}&limit=${limit}&from=${from}&to=${to}`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export async function registerSchedule(schedule: IMakeNewScheduleRequest): Promise<IMakeNewScheduleResponse> {
    const res = await fetch(`${SERVER_URL}/v1/schedules`, {
        method: 'POST',
        body: JSON.stringify(schedule),
    })
    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export async function getScheduleDetail(scheduleId: string): Promise<IScheduleItem> {
    const res = await fetch(`${SERVER_URL}/v1/schedules/${scheduleId}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export async function updateSchedule(schedule: IScheduleItem): Promise<IScheduleItem> {
    const res = await fetch(`${SERVER_URL}/v1/schedules/${schedule._id}`, {
        method: 'PUT',
        body: JSON.stringify(schedule),
    })
    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export async function getDailyScheduleCount(from: Date, to: Date): Promise<IGetDailyScheduleCountResponse> {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const res = await fetch(`${SERVER_URL}/v1/schedules/dailyCount?from=${from.toISOString()}&to=${to.toISOString()}&timezone=${timezone}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export const deleteSchedule = async (scheduleId: string) => {
    const res = await fetch(`${SERVER_URL}/v1/schedules/${scheduleId}`, {
        method: 'DELETE',
    })

    if (!res.ok) throw new Error('삭제 실패')
}
