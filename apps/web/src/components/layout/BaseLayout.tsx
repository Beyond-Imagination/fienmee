import React from 'react'

interface BaseLayoutProps {
    header: React.ReactNode
    children: React.ReactNode
    footer?: React.ReactNode
}

export function BaseLayout({ header, children, footer }: BaseLayoutProps) {
    return (
        <div className="flex flex-col w-full h-screen">
            <div className="shrink-0">{header}</div>
            <main className="flex-1 w-full overflow-y-auto">{children}</main>
            <div className="shrink-0">{footer}</div>
        </div>
    )
}
