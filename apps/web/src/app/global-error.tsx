import React from 'react'
import { ErrorPage } from '@/components/errorPage'

export default function GlobalError({ error }: { error: Error }) {
    console.error(error)

    return (
        <html>
            <body>
                <ErrorPage />
            </body>
        </html>
    )
}
