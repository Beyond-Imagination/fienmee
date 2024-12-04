'use client'

import './globals.css'
import localFont from 'next/font/local'
import { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5,
                        gcTime: 1000 * 60 * 5,
                    },
                    mutations: {
                        throwOnError: true,
                        retry: 1,
                    },
                },
            }),
    )
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </body>
        </html>
    )
}
