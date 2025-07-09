import React from 'react'
import { PageTitleHeader } from '@/components/header'
import { BaseLayout } from '@/components/layout/BaseLayout'

export default function BackButtonLayout({ children }: { children: React.ReactNode }) {
    return <BaseLayout header={<PageTitleHeader />}>{children}</BaseLayout>
}
