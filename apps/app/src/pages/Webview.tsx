import React, { useEffect, useRef } from 'react'
import { BackHandler } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'

import { IBackButtonData, IJWTData, isLogoutData } from '@fienmee/types'

import { ENV, FE_URL } from '@/config'
import { deleteToken, getToken } from '@/stores/token'
import { WebviewScreenProps } from '@/types'

export function WebviewScreen() {
    const navigation = useNavigation<WebviewScreenProps['navigation']>()
    const webViewRef = useRef<WebView>(null)
    const onLoad = async () => {
        const credential = await getToken()
        webViewRef.current?.postMessage(JSON.stringify({ type: 'jwt', jwt: credential.accessToken } as IJWTData))
    }

    const onMessage = async (e: WebViewMessageEvent) => {
        const data = JSON.parse(e.nativeEvent.data)
        if (isLogoutData(data)) {
            await deleteToken()
            navigation.navigate('Login')
        }
    }

    useEffect(() => {
        const onPress = () => {
            webViewRef.current?.postMessage(JSON.stringify({ type: 'backButton' } as IBackButtonData))
            return true
        }

        BackHandler.addEventListener('hardwareBackPress', onPress)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onPress)
        }
    }, [])

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
