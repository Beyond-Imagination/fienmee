'use client'

import './globals.css'
import localFont from 'next/font/local'
import React, { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Script from 'next/script'

import { KAKAO_API_KEY } from '@/config'
import '@/libs/fetchIntercept'

import { useBridge } from '@/hooks/bridges'
import { Authentication } from '@/components/authentication'

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
const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`

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
    useBridge()
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <QueryClientProvider client={queryClient}>
                    <Authentication>{children}</Authentication>
                </QueryClientProvider>
                <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
            </body>
        </html>
    )
}
