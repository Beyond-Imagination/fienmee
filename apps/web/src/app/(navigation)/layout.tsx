import React from 'react'
import { LogoHeader } from '@/components/header'
import { Navigation } from '@/components/navigation'

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <LogoHeader />
            {children}
            <Navigation />
        </div>
    )
}
