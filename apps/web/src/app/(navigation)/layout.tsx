import React from 'react'
import { LogoHeader } from '@/components/header'
import { Navigation } from '@/components/navigation'

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full">
            <LogoHeader />
            <div className="w-full h-full pb-36">{children}</div>
            <Navigation />
        </div>
    )
}
