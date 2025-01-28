import React, { useRef } from 'react'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'

import { IJWTData, isLogoutData } from '@fienmee/types'

import { ENV, FE_URL } from '@/config'
import { deleteToken, getToken } from '@/stores/token'
import { WebviewScreenProps } from '@/types'

export function WebviewScreen() {
    const navigation = useNavigation<WebviewScreenProps['navigation']>()
    const webViewRef = useRef<WebView>(null)
    const onLoad = async () => {
        const jwt = await getToken()
        webViewRef.current?.postMessage(JSON.stringify({ type: 'jwt', jwt: jwt } as IJWTData))
    }

    const onMessage = async (e: WebViewMessageEvent) => {
        const data = e.nativeEvent.data

        if (isLogoutData(data)) {
            await deleteToken()
            navigation.navigate('Login')
        }
    }

    return (
        <WebView
            source={{ uri: FE_URL }}
            ref={webViewRef}
            onLoad={onLoad}
            onMessage={onMessage}
            containerStyle={{ flex: 0, width: '100%', height: '100%' }}
            webviewDebuggingEnabled={ENV}
            overScrollMode="never"
        />
    )
}
