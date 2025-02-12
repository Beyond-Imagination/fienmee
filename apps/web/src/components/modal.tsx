import React from 'react'
import { CloseIcon } from '@/components/icon'

interface Props {
    isOpen: boolean
    hasClose: boolean
    onClose: () => void
    children: React.ReactNode
}

export function FullScreenDialog({ isOpen, onClose, hasClose, children }: Props) {
    return (
        <div
            className={`fixed inset-0 bg-white items-center justify-center shadow-[0_-1px_4px_rgba(0,0,0,0.25)] rounded-2xl z-50 
                        ${isOpen ? 'translate-y-[2rem]' : 'translate-y-full'} transition-transform duration-300 p-6`}
        >
            <button className={`${hasClose ? '' : 'hidden'} flex justify-start w-full mb-4`} onClick={onClose}>
                <CloseIcon width={24} height={24} />
            </button>
            {children}
        </div>
    )
}
