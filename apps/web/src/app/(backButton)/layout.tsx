import React from 'react'
import { PageTitleHeader } from '@/components/header'

export default function BackButtonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <PageTitleHeader />
            {children}
        </div>
    )
}
