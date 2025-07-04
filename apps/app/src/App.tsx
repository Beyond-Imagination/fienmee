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
        const createChannel = async () => {
            const settings = await notifee.requestPermission()
            if (settings.authorizationStatus >= 1) {
                await notifee.createChannel({
                    id: 'default',
                    name: 'Fienmee',
                    importance: AndroidImportance.HIGH,
                })
            }
        }
        createChannel()
        PushNotificationService.setMessageHandler()
        PushNotificationService.listenRefreshToken(async token => {
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
        })
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
