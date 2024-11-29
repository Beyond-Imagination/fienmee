import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppleOauthLogin, GoogleOauthLogin, KakaoOauthLogin, NaverOauthLogin } from '../components/ouathButton.tsx'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
})

export default function LoginScreen() {
    return (
        <View style={[styles.container, { paddingTop: 100, flexDirection: 'column', backgroundColor: '#FFFFFF' }]}>
            {/*TODO: change logo*/}
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 50,
                    width: '70%',
                    height: '50%',
                    backgroundColor: '#D9D9D9',
                }}
            >
                <Text>Logo</Text>
            </View>
            <View style={styles.container}>
                <KakaoOauthLogin />
                <NaverOauthLogin />
                <AppleOauthLogin />
                <GoogleOauthLogin />
            </View>
        </View>
    )
}
