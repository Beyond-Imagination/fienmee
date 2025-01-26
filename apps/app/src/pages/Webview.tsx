import React, { useRef } from 'react'
import { WebView } from 'react-native-webview'

import { ENV, FE_URL } from '@/config'
import { getToken } from '@/stores/token'

export function WebviewScreen() {
    const webViewRef = useRef<WebView>(null)
    const onLoad = async () => {
        const jwt = await getToken()
        webViewRef.current?.postMessage(JSON.stringify({ type: 'jwt', jwt: jwt }))
    }

    return (
        <WebView
            source={{ uri: FE_URL }}
            ref={webViewRef}
            onLoad={onLoad}
            containerStyle={{ flex: 0, width: '100%', height: '100%' }}
            webviewDebuggingEnabled={ENV}
            overScrollMode="never"
        />
    )
}
