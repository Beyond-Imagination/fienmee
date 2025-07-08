import React from 'react'

interface BaseLayoutProps {
    header: React.ReactNode
    children: React.ReactNode
    footer?: React.ReactNode
}

export function BaseLayout({ header, children, footer }: BaseLayoutProps) {
    return (
        <div className="flex flex-col w-full h-dvh">
            <div className="shrink-0">{header}</div>
            <main className="w-full h-full overflow-y-scroll">{children}</main>
            <div className="shrink-0">{footer}</div>
        </div>
    )
}
