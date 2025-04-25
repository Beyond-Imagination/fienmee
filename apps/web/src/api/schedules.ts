import { SERVER_URL } from '@/config'
import { IGetScheduleListResponse, IMakeNewScheduleRequest, IMakeNewScheduleResponse, IScheduleItem } from '@fienmee/types'

export async function getSchedulesByDate(date: Date, page: number, limit: number): Promise<IGetScheduleListResponse> {
    const from = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
    const to = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
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
