import React from 'react'
import config from 'react-native-config'
import { WebView } from 'react-native-webview'

export default function WebviewScreen() {
    return (
        <WebView
            source={{ uri: config.FE_URL }}
            containerStyle={{ flex: 0, width: '100%', height: '100%' }}
            webviewDebuggingEnabled={true}
            useWebKit={true}
        />
    )
}
