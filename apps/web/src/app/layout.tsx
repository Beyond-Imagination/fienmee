import './globals.css'
import localFont from 'next/font/local'
import React from 'react'
import Script from 'next/script'

import { KAKAO_API_KEY } from '@/config'

import { BridgeProvider, ReactQueryProvider } from '@/providers'
import { Authentication } from '@/components/authentication'
import { ToastContainer } from 'react-toastify'
import ViewportHeightSetter from '@/components/viewportHeightSetter'

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
    return (
        <html lang="en" className="h-full">
            <body className={`h-full ${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ViewportHeightSetter />
                <ReactQueryProvider>
                    <BridgeProvider>
                        <Authentication>{children}</Authentication>
                    </BridgeProvider>
                </ReactQueryProvider>
                <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
                <ToastContainer />
            </body>
        </html>
    )
}
