'use client'

import './globals.css'

import { Inter } from 'next/font/google'
import { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })

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
            <body className={inter.className}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </body>
        </html>
    )
}
