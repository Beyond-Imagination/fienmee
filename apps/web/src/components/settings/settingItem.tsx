import React from 'react'

interface Props {
    text: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children: React.ReactNode
}

export default function SettingItem({ text, children, onClick }: Props) {
    return (
        <button className="flex flex-row w-full items-center justify-start p-4 gap-4" onClick={onClick}>
            {children}
            <span className="text-3xl text-center">{text}</span>
        </button>
    )
}
