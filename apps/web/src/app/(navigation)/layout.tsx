import React from 'react'

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            <div>navigation</div>
        </div>
    )
}
