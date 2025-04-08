import { SERVER_URL } from '@/config'
import { IGetScheduleListResponse } from '@fienmee/types'

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
