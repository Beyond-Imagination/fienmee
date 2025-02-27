import { SERVER_URL } from '@/config'
import { IGetScheduleListResponse } from '@fienmee/types'

export async function getSchedulesByDate(date: Date, page: number, limit: number): Promise<IGetScheduleListResponse> {
    const token = sessionStorage.getItem('access_token')
    const from = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
    const to = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
    const res = await fetch(`${SERVER_URL}/v1/schedules?page=${page}&limit=${limit}&from=${from}&to=${to}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}
