import { IGetNotificationListResponse } from '@fienmee/types'
import { SERVER_URL } from '@/config'

export async function getNotifications(page: number, limit: number): Promise<IGetNotificationListResponse> {
    const res = await fetch(`${SERVER_URL}/v1/notification?page=${page}&limit=${limit}`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export async function postNotificationRead(id: string): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/notification/${id}/read`, {
        method: 'POST',
    })

    if (!res.ok) {
        throw await res.json()
    }
}
