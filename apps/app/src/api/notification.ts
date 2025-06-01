import { BE_URL } from '@/config'
import { IRequestNotificationToken } from '@fienmee/types'

export async function submitFCMToken(request: IRequestNotificationToken): Promise<void> {
    const res = await fetch(`${BE_URL}/v1/notification/token`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${request.accessToken}` },
        body: JSON.stringify(request.body),
    })

    if (!res.ok) {
        throw await res.json()
    }

    return res.json()
}
