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

import { LoginScreen, RegisterScreen, WebviewScreen, ErrorScreen } from '@/pages'
import { RootStackParamList } from '@/types'
import PushNotificationService from '@/services/pushNotificationService.ts'
import { getToken } from '@/stores'
import { IRequestNotificationToken } from '@fienmee/types'
import { submitFCMToken } from '@/api'

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark'

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    const Stack = createNativeStackNavigator<RootStackParamList>()

    useEffect(() => {
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
            console.log(request)
            await submitFCMToken(request)
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
