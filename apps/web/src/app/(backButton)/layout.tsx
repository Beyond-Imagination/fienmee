import React from 'react'

export default function BackButtonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>back button</div>
            {children}
        </div>
    )
}
