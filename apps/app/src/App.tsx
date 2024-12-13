/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { useColorScheme } from 'react-native'
import { WebView } from 'react-native-webview'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import config from 'react-native-config'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import LoginScreen from '../pages/login.tsx'

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark'

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    contentStyle: backgroundStyle,
                }}
            >
                {/*TODO: make page file*/}
                <Stack.Screen
                    name="WebView"
                    component={() => {
                        return <WebView source={{ uri: config.FE_URL }} containerStyle={{ flex: 0, width: '100%', height: '100%' }} />
                    }}
                />
                <Stack.Screen
                    name="LoginView"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
