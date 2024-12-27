import React from 'react'
import { LogoHeader } from '@/components/header'
import { Navigation } from '@/components/navigation'

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full">
            <LogoHeader />
            <div className="pt-24 w-full h-full">{children}</div>
            <Navigation />
        </div>
    )
}
