/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ErrorBoundary from 'react-native-error-boundary'
import notifee, { AndroidImportance } from '@notifee/react-native'

import { ErrorScreen, LoginScreen, RegisterScreen, WebviewScreen } from '@/pages'
import { RootStackParamList } from '@/types'
import PushNotificationService from '@/services/pushNotificationService.ts'
import { getToken } from '@/stores'
import { IRequestNotificationToken } from '@fienmee/types'
import { submitFCMToken } from '@/api'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { GOOGLE_CLIENT_ID } from '@/config'

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark'

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    const Stack = createNativeStackNavigator<RootStackParamList>()

    useEffect(() => {
        const setupNotifications = async () => {
            try {
                const settings = await notifee.requestPermission()
                if (settings.authorizationStatus >= 1) {
                    await notifee.createChannel({
                        id: 'default',
                        name: 'Fienmee',
                        importance: AndroidImportance.HIGH,
                    })
                }

                PushNotificationService.setMessageHandler(
                    async remoteMessage => {
                        console.log('Background message received: ', JSON.stringify(remoteMessage))
                    },
                    async remoteMessage => {
                        const { title, body } = remoteMessage.notification ?? {}
                        try {
                            await notifee.displayNotification({
                                title,
                                body,
                                android: {
                                    channelId: 'default',
                                    smallIcon: 'ic_launcher',
                                    pressAction: {
                                        id: 'default',
                                        launchActivity: 'default',
                                    },
                                },
                            })
                        } catch (error) {
                            console.error('Failed to display notification:', error)
                        }
                    },
                )

                PushNotificationService.listenRefreshToken(async token => {
                    try {
                        const credential = await getToken()

                        const info = await PushNotificationService.getDeviceInfo()
                        const request: IRequestNotificationToken = {
                            body: {
                                token: token,
                                deviceId: info.deviceId,
                                platform: info.platform,
                            },
                            accessToken: credential.accessToken,
                        }
                        await submitFCMToken(request)
                    } catch (error) {
                        // 권한 실패 또는 FCM 토큰 생성 실패 시 에러 로깅 후 무시
                        console.error('Error during FCM token refresh and submission:', error)
                    }
                })
            } catch (error) {
                // notifee 채널 생성 실패(foreground message 처리 불가) 시 에러 로깅 후 무시
                console.error('Initial notification setup failed:', error)
            }
        }
        setupNotifications()
        GoogleSignin.configure({
            webClientId: GOOGLE_CLIENT_ID,
            offlineAccess: true, // refresh token 받기 위해 필요
        })
    }, [])

    return (
        <ErrorBoundary>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        contentStyle: backgroundStyle,
                    }}
                >
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="WebView"
                        component={WebviewScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Error"
                        component={ErrorScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ErrorBoundary>
    )
}

export default App
