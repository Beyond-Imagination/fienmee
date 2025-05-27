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
import PushNotificationService from '@/services/pushNotificationService'

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark'

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    const Stack = createNativeStackNavigator<RootStackParamList>()

    useEffect(() => {
        const initPush = async () => {
            try {
                const info = await PushNotificationService.getDeviceInfo()
                if (info) {
                    console.log('FCM token info:', info)
                    // TODO: 서버에 토큰 전송
                }
            } catch (error) {
                console.log('Error while initializing push notification:', error) // TODO: 함수 실패 시 처리 로직 추가
            }
        }
        initPush()

        PushNotificationService.setMessageHandler()
        PushNotificationService.listenRefreshToken(token => {
            console.log('FCM token refreshed:', token)
            // TODO: 서버에 갱신된 토큰 전송
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
