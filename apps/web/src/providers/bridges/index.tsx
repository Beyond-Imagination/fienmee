'use client'

import React from 'react'
import { useBridge } from '@/hooks/bridges'

export function BridgeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    useBridge()
    return <div>{children}</div>
}
