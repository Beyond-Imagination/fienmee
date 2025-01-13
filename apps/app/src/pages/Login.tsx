import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

import { AppleOauthLogin, GoogleOauthLogin, KakaoOauthLogin, NaverOauthLogin } from '../components/login'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default function LoginScreen() {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            style={[styles.container, { paddingTop: 100, backgroundColor: '#FFFFFF' }]}
        >
            {/*TODO: change logo*/}
            <View
                style={{
                    flex: 2,
                    width: '60%',
                    height: 300,
                    marginVertical: 30,
                    alignItems: 'stretch',
                    alignSelf: 'center',
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
        </ScrollView>
    )
}
