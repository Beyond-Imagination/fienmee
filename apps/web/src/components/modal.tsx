import React from 'react'
import { CloseIcon } from '@/components/icon'

interface Props {
    isOpen: boolean
    hasClose?: boolean
    onClose?: () => void
    children: React.ReactNode
}

export function FullScreenDialog({ isOpen, onClose, hasClose, children }: Props) {
    return (
        <div
            className={`fixed inset-0 bg-white items-center justify-center shadow-[0_-1px_4px_rgba(0,0,0,0.25)] rounded-2xl z-50 
                        ${isOpen ? 'translate-y-[2rem]' : 'translate-y-full'} transition-transform duration-300 p-6`}
        >
            <button className={`${hasClose ? '' : 'hidden'} flex justify-start w-full mb-4`} onClick={onClose}>
                <CloseIcon width="1.5rem" height="1.5rem" />
            </button>
            {children}
        </div>
    )
}

export function AlterDialog({ isOpen, children }: Props) {
    return (
        <div
            className={`flex fixed inset-0 bg-[#00000050] items-center justify-center transition-transform duration-300 p-6 ${isOpen ? 'opacity-100 z-50' : 'opacity-0 -z-50'}`}
        >
            <div className="bg-white rounded-2xl p-4">{children}</div>
        </div>
    )
}
