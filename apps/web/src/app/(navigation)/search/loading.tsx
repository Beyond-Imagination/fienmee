'use client'

import { ClipLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center bg-white">
            <ClipLoader color="#FF6B6B" size={50} />
        </div>
    )
}
