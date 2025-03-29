import { SERVER_URL } from '@/config'
import { IGetScheduleListResponse } from '@fienmee/types'

export async function getSchedulesByDate(date: Date, page: number, limit: number): Promise<IGetScheduleListResponse> {
    const from = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
    const to = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
    const res = await fetch(`${SERVER_URL}/v1/schedules?page=${page}&limit=${limit}&from=${from}&to=${to}`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}

export async function getSchedulesInMonth(year: number, month: number): Promise<IGetScheduleListResponse> {
    const from = new Date(year, month + 1, 1)
    const to = new Date(year, month, 0, 23, 59, 59)
    const res = await fetch(`${SERVER_URL}/v1/schedules?from=${from}&to=${to}&isPaginated=false`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}
