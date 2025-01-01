import React from 'react'
import { LogoHeader } from '@/components/header'
import { Navigation } from '@/components/navigation'

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid w-full h-screen">
            <LogoHeader />
            <div className="w-full h-full overflow-y-scroll">{children}</div>
            <Navigation />
        </div>
    )
}
