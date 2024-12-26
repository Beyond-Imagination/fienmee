import Link from 'next/link'
import React from 'react'

interface NavigationItemProps {
    uri: string
    text: string
    isClicked: boolean
    children: React.ReactNode
}

export function NavigationItem({ uri, text, isClicked, children }: NavigationItemProps) {
    return (
        <Link type="button" href={uri} className="inline-flex flex-col items-center justify-center gap-2 px-2 group">
            {children}
            <span className={`text-sm ${isClicked ? 'text-[#FF9575]' : 'text-[#C8C5CC]'}`}>{text}</span>
        </Link>
    )
}
