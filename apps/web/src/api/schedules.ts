import { SERVER_URL } from '@/config'
import {
    IGetDailyScheduleCountResponse,
    IGetScheduleListResponse,
    IMakeNewScheduleRequest,
    IMakeNewScheduleResponse,
    IScheduleItem,
} from '@fienmee/types'

function getKSTDateString(date: Date): string {
    const kstDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
    const year = kstDate.getFullYear()
    const month = String(kstDate.getMonth() + 1).padStart(2, '0')
    const day = String(kstDate.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
}

function toKSTISOString(date: Date, hour = 0, minute = 0, second = 0): string {
    const kst = new Date(date)
    kst.setHours(hour - 9, minute, second, 0)
    return new Date(kst).toISOString()
}

export async function getSchedulesByDate(date: Date, page: number, limit: number): Promise<IGetScheduleListResponse> {
    const from = getKSTDateString(date)
    const to = getKSTDateString(date)

    const res = await fetch(`${SERVER_URL}/v1/schedules?page=${page}&limit=${limit}&from=${from}&to=${to}`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export async function registerSchedule(schedule: IMakeNewScheduleRequest): Promise<IMakeNewScheduleResponse> {
    const adjustedSchedule = {
        ...schedule,
        startDate: toKSTISOString(new Date(schedule.startDate)),
        endDate: toKSTISOString(new Date(schedule.endDate)),
    }

    const res = await fetch(`${SERVER_URL}/v1/schedules`, {
        method: 'POST',
        body: JSON.stringify(adjustedSchedule),
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
    const adjustedSchedule = {
        ...schedule,
        startDate: toKSTISOString(new Date(schedule.startDate)),
        endDate: toKSTISOString(new Date(schedule.endDate)),
    }

    const res = await fetch(`${SERVER_URL}/v1/schedules/${schedule._id}`, {
        method: 'PUT',
        body: JSON.stringify(adjustedSchedule),
    })

    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export async function getDailyScheduleCount(from: Date, to: Date): Promise<IGetDailyScheduleCountResponse> {
    const fromStr = getKSTDateString(from)
    const toStr = getKSTDateString(to)

    const res = await fetch(`${SERVER_URL}/v1/schedules/dailyCount?from=${fromStr}&to=${toStr}`, {
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
