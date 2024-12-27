import React from 'react'
import { PageTitleHeader } from '@/components/header'

export default function BackButtonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full">
            <PageTitleHeader />
            <div className="pt-24 w-full h-full">{children}</div>
        </div>
    )
}
