'use client'

import { ClipLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className="mx-auto w-full max-w-[420px] min-h-screen bg-white overflow-x-hidden">
            <div className="flex h-[60vh] items-center justify-center">
                {' '}
                <ClipLoader color="#FF6B6B" size={50} />
            </div>
            <div className="h-16" />
        </div>
    )
}
