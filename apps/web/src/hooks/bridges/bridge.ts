import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { isBackButtonData, isJWTData } from '@fienmee/types'
import { credentialStore } from '@/store'

type setCredentialFunc = (accessToken: string, expiresAt: Date) => void

const messageHandler = (router: AppRouterInstance, setCredential: setCredentialFunc) => (event: MessageEvent) => {
    const message = JSON.parse(event.data)
    if (isJWTData(message)) {
        setCredential(message.jwt, new Date(message.expiresAt))
    } else if (isBackButtonData(message)) {
        router.back() // TODO: 더 이상 뒤로 갈곳이 없으면 앱 종료
    }
}

export function useBridge() {
    const router = useRouter()
    const { setCredential } = credentialStore()

    useEffect(() => {
        document.addEventListener('message', messageHandler(router, setCredential) as EventListener) // android
        window.addEventListener('message', messageHandler(router, setCredential)) // ios
    })
}

export function requestRefresh() {
    if (typeof window !== undefined) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'refresh' }))
    }
}

export function requestLogout() {
    if (typeof window !== undefined) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'logout' }))
    }
}
