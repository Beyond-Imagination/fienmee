import { SERVER_URL } from '@/config'

export async function logout(): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/users/logout`, {
        method: 'DELETE',
    })
    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}

export async function deleteUser(): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/users`, {
        method: 'DELETE',
    })
    if (!res.ok) {
        throw new Error(`code ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}
