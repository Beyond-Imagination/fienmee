import { BE_URL } from '../config'

export async function login(request: loginRequest): Promise<loginResponse> {
    const res = await fetch(`${BE_URL}/v1/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }

    return res.json()
}

// TODO: type 선언 공통 패키지로 이동하기
export interface loginRequest {
    accessToken: string
    refreshToken: string
    provider: string
}

export interface loginResponse {
    accessToken: string
}
