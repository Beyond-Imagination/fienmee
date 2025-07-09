import React from 'react'
import { LogoHeader } from '@/components/header'
import { Navigation } from '@/components/navigation'
import { BaseLayout } from '@/components/layout/BaseLayout'

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
    return (
        <BaseLayout header={<LogoHeader />} footer={<Navigation />}>
            {children}
        </BaseLayout>
    )
}
