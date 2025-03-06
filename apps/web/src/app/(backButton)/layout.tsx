import React from 'react'
import { PageTitleHeader } from '@/components/header'

export default function BackButtonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full h-dvh">
            <PageTitleHeader />
            <div className="w-full h-full overflow-y-scroll">{children}</div>
        </div>
    )
}
