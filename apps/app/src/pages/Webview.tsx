import React, { useEffect, useRef } from 'react'
import { BackHandler } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'

import { IBackButtonData, IJWTData, IRequestNotificationToken, isErrorResponse, isLogoutData, isRefreshData } from '@fienmee/types'

import { ENV, FE_URL } from '@/config'
import { deleteToken, getToken, setToken } from '@/stores'
import { WebviewScreenProps } from '@/types'
import { refresh, refreshFCMToken, registerFCMToken } from '@/api'
import PushNotificationService from '@/services/pushNotificationService'

const INJECTED_JAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `

export function WebviewScreen() {
    const navigation = useNavigation<WebviewScreenProps['navigation']>()
    const webViewRef = useRef<WebView>(null)
    const onLoad = async () => {
        const credential = await getToken()
        webViewRef.current?.postMessage(
            JSON.stringify({ type: 'jwt', jwt: credential.accessToken, expiresAt: credential.accessTokenExpiresAt } as IJWTData),
        )
    }

    const onMessage = async (e: WebViewMessageEvent) => {
        const data = JSON.parse(e.nativeEvent.data)
        if (isLogoutData(data)) {
            await deleteToken()
            navigation.navigate('Login')
        } else if (isRefreshData(data)) {
            const credential = await getToken()
            const newCredential = await refresh({ refreshToken: credential.refreshToken })
            await setToken({
                accessToken: newCredential.accessToken,
                accessTokenExpiresAt: newCredential.accessTokenExpiresAt,
                refreshToken: newCredential.refreshToken || credential.refreshToken,
                refreshTokenExpiresAt: newCredential.refreshTokenExpiresAt || credential.refreshTokenExpiresAt,
            })
            webViewRef.current?.postMessage(
                JSON.stringify({ type: 'jwt', jwt: newCredential.accessToken, expiresAt: newCredential.accessTokenExpiresAt } as IJWTData),
            )
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

    useEffect(() => {
        const initPush = async () => {
            const credential = await getToken()
            try {
                const info = await PushNotificationService.getDeviceInfo()
                const fcmRequest: IRequestNotificationToken = {
                    body: info,
                    accessToken: credential.accessToken,
                }
                await registerFCMToken(fcmRequest)
            } catch (error) {
                if (isErrorResponse(error) && error.code === 8000) {
                    const fcmRequest: IRequestNotificationToken = {
                        body: {
                            token: PushNotificationService.token,
                            deviceId: PushNotificationService.deviceId,
                            platform: PushNotificationService.platform,
                        },
                        accessToken: credential.accessToken,
                    }
                    await refreshFCMToken(fcmRequest)
                } else {
                    navigation.navigate('Error')
                }
            }
        }
        initPush()
        PushNotificationService.setMessageHandler()
        PushNotificationService.listenRefreshToken(async token => {
            const credential = await getToken()
            const request: IRequestNotificationToken = {
                body: {
                    token: token,
                    deviceId: PushNotificationService.deviceId,
                    platform: PushNotificationService.platform,
                },
                accessToken: credential.accessToken,
            }
            await refreshFCMToken(request)
        })
    }, [navigation])

    return (
        <WebView
            source={{ uri: FE_URL }}
            ref={webViewRef}
            onLoad={onLoad}
            onMessage={onMessage}
            containerStyle={{ flex: 0, width: '100%', height: '100%' }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            webviewDebuggingEnabled={ENV}
            overScrollMode="never"
        />
    )
}
