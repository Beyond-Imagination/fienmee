import { SERVER_URL } from '@/config'

export async function logout(): Promise<void> {
    const token = sessionStorage.getItem('access_token')
    const res = await fetch(`${SERVER_URL}/v1/users/logout`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}

export async function deleteUser(): Promise<void> {
    const token = sessionStorage.getItem('access_token')
    const res = await fetch(`${SERVER_URL}/v1/users`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
        throw new Error(`code ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}
