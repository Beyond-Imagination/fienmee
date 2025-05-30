import { BE_URL } from '@/config'
import { INotificationToken } from '@fienmee/types'
import { getToken } from '@/stores'

export async function registerFCMToken(request: INotificationToken): Promise<void> {
    const res = await fetch(`${BE_URL}/v1/notification/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })

    if (!res.ok) {
        throw await res.json()
    }

    return res.json()
}

export async function refreshFCMToken(request: INotificationToken): Promise<void> {
    let accessToken = ''
    try {
        const credentials = await getToken()
        accessToken = credentials.accessToken
    } catch (e) {
        console.log(e)
        accessToken = ''
    }
    const res = await fetch(`${BE_URL}/v1/notification/token`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(request),
    })

    if (!res.ok) {
        throw await res.json()
    }

    return res.json()
}
