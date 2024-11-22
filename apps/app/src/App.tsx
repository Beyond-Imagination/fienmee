/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, useColorScheme } from 'react-native'
import { WebView } from 'react-native-webview'

import { Colors } from 'react-native/Libraries/NewAppScreen'

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark'

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <WebView source={{ uri: 'http://192.168.0.5:3000/' }} containerStyle={{ flex: 0, width: '100%', height: '100%' }} />
        </SafeAreaView>
    )
}

export default App
