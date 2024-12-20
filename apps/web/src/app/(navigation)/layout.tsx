import React from 'react'
import { Navigation } from '@/components/navigation'

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            <Navigation />
        </div>
    )
}
