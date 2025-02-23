import { loginRequest, loginResponse, refreshRequest, refreshResponse, registerRequest, registerResponse } from '@fienmee/types'

import { BE_URL } from '@/config'

export async function login(request: loginRequest): Promise<loginResponse> {
    const res = await fetch(`${BE_URL}/v1/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })

    if (!res.ok) {
        throw await res.json()
    }

    return res.json()
}

export async function register(request: registerRequest): Promise<registerResponse> {
    const res = await fetch(`${BE_URL}/v1/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })

    if (!res.ok) {
        throw await res.json()
    }

    return res.json()
}

export async function refresh(request: refreshRequest): Promise<refreshResponse> {
    const res = await fetch(`${BE_URL}/v1/users/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${request.refreshToken}` },
    })

    if (!res.ok) {
        throw await res.json()
    }

    return res.json()
}
