import React from 'react'
import { PageTitleHeader } from '@/components/header'

export default function BackButtonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid w-full h-screen">
            <PageTitleHeader />
            <div className="w-full h-full overflow-y-scroll">{children}</div>
        </div>
    )
}
