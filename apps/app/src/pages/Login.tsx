import { View, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'

import { GoogleOauthLogin, KakaoOauthLogin } from '@/components/login'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingTop: 100,
        backgroundColor: '#fffce0',
    },
    logoContainer: {
        flex: 2,
        width: '60%',
        height: 300,
        marginVertical: 30,
        alignItems: 'stretch',
        alignSelf: 'center',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
})

export function LoginScreen() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('./../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
            </View>
            <View style={styles.container}>
                <KakaoOauthLogin />
                {/* <NaverOauthLogin /> */}
                {/* <AppleOauthLogin /> */}
                <GoogleOauthLogin />
            </View>
        </ScrollView>
    )
}
