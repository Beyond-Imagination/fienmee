import { loginRequest, loginResponse } from '@fienmee/types'

import { BE_URL } from '../config'

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
