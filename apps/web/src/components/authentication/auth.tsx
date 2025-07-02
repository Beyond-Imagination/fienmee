'use client'

import { ReactNode } from 'react'
import Image from 'next/image'

import { credentialStore } from '@/store'
import { PulseLoader } from 'react-spinners'

export function Authentication({ children }: { children?: ReactNode }) {
    const { accessToken, expiresAt } = credentialStore()

    if (!accessToken || !expiresAt || new Date(expiresAt).getTime() < new Date().getTime()) {
        return (
            <div className="flex flex-col h-screen items-center justify-center py-20" style={{ backgroundColor: '#fffce0' }}>
                <Image src={'/logo.png'} alt={'logo'} width={250} height={250} />
                <PulseLoader color="#FF6B6B" size={20} />
            </div>
        )
    }

    return <div>{children}</div>
}
