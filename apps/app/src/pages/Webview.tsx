import React from 'react'
import { WebView } from 'react-native-webview'

import { DEBUG, FE_URL } from '../config'

export default function WebviewScreen() {
    return <WebView source={{ uri: FE_URL }} containerStyle={{ flex: 0, width: '100%', height: '100%' }} webviewDebuggingEnabled={DEBUG} />
}
