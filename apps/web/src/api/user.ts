import { SERVER_URL } from '@/config'
import { toggleInterestRequest } from '@fienmee/types/api'

export async function logout(): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/users/logout`, {
        method: 'DELETE',
    })
    if (!res.ok) {
        throw await res.json()
    }
    return
}

export async function deleteUser(): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/users`, {
        method: 'DELETE',
    })
    if (!res.ok) {
        throw await res.json()
    }
    return
}

export async function toggleInterest(request: toggleInterestRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/users/interest`, {
        method: 'PUT',
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw await res.json()
    }
    return
}
