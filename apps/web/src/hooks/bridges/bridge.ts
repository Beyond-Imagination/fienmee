import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { isBackButtonData, isJWTData } from '@fienmee/types'

const messageHandler = (router: AppRouterInstance) => (event: MessageEvent) => {
    const message = JSON.parse(event.data)
    if (isJWTData(message)) {
        sessionStorage.setItem('access_token', message.jwt)
        sessionStorage.setItem('access_token_expires_at', message.expiresAt.toString())
    } else if (isBackButtonData(message)) {
        router.back() // TODO: 더 이상 뒤로 갈곳이 없으면 앱 종료
    }
}

export function useBridge() {
    const router = useRouter()

    useEffect(() => {
        document.addEventListener('message', messageHandler(router) as EventListener) // android
        window.addEventListener('message', messageHandler(router)) // ios
    })
}

export function requestRefresh() {
    if (typeof window !== undefined) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'refresh' }))
    }
}
