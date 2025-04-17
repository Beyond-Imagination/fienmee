'use client'

import React, { useEffect } from 'react'
import { ErrorPage } from '@/components/errorPage'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html>
            <body>
                <ErrorPage />
                <button onClick={() => reset()}>다시 시도</button>
            </body>
        </html>
    )
}
