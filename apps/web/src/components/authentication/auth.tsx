'use client'

import { ReactNode } from 'react'
import { credentialStore } from '@/store'

export function Authentication({ children }: { children?: ReactNode }) {
    const { accessToken, expiresAt } = credentialStore()

    if (!accessToken || !expiresAt || new Date(expiresAt).getTime() < new Date().getTime()) {
        return <div>loading</div> // TODO loading 화면 변경
    }

    return <div>{children}</div>
}
