import { Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { LoginScreenProps } from '@/types'
import { GoogleSignin, isErrorWithCode, SignInSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin'
import { isErrorResponse } from '@fienmee/types'
import { getGoogleRefreshToken, login } from '@/api'
import { setToken } from '@/stores'

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        height: 50,
        marginHorizontal: '20%',
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        paddingLeft: 20,
        paddingBottom: 5,
    },
})

export function NaverOauthLogin() {
    const navigation = useNavigation<LoginScreenProps['navigation']>()
    const onPress = () => {
        // TODO: implement logic
        navigation.navigate('WebView')
    }

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#03C75A' }]} onPress={onPress} activeOpacity={1}>
            <Image style={{ overflow: 'hidden', width: 32, height: 32 }} source={require('../../../assets/naverLoginLogo.png')} />
            <Text style={[styles.text, { color: '#FFFFFF' }]}>네이버 로그인</Text>
        </TouchableOpacity>
    )
}

export function GoogleOauthLogin() {
    const navigation = useNavigation<LoginScreenProps['navigation']>()
    const onPress = async () => {
        const userInfo = (await GoogleSignin.signIn()) as SignInSuccessResponse & { serverAuthCode?: string }
        const serverAuthCode = userInfo.data.serverAuthCode
        if (!serverAuthCode) {
            throw new Error('Server Auth Code is missing')
        }

        const tokens = await GoogleSignin.getTokens()
        const refreshToken = await getGoogleRefreshToken(serverAuthCode)
        try {
            const credential = await login({
                ...tokens,
                refreshToken: refreshToken,
                provider: 'GOOGLE',
            })
            await setToken(credential)
            navigation.navigate('WebView')
        } catch (error) {
            if (isErrorResponse(error) && (error.code === 4100 || error.code === 4101)) {
                navigation.navigate('Register', {
                    accessToken: tokens.accessToken,
                    refreshToken: refreshToken,
                    provider: 'GOOGLE',
                })
            } else {
                if (isErrorWithCode(error)) {
                    switch (error.code) {
                        case statusCodes.SIGN_IN_CANCELLED:
                            return
                        case statusCodes.IN_PROGRESS:
                            Alert.alert('중복된 요청입니다.')
                            return
                    }
                } else {
                    navigation.navigate('Error')
                }
            }
        }
    }

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FFFFFF', borderColor: '#E5E5EA', borderWidth: 1 }]}
            onPress={onPress}
            activeOpacity={1}
        >
            <Image style={{ overflow: 'hidden', width: 24, height: 24 }} source={require('../../../assets/googleLoginLogo.png')} />
            <Text style={[styles.text, { color: '#000000' }]}>Google 로그인</Text>
        </TouchableOpacity>
    )
}

export function AppleOauthLogin() {
    const navigation = useNavigation<LoginScreenProps['navigation']>()
    const onPress = () => {
        // TODO: implement logic
        navigation.navigate('WebView')
    }

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#000000' }]} onPress={onPress} activeOpacity={1}>
            <Image style={{ overflow: 'hidden', width: 24, height: 50 }} source={require('../../../assets/appleLoginLogo.png')} />
            <Text style={[styles.text, { color: '#FFFFFF' }]}>Apple 로그인</Text>
        </TouchableOpacity>
    )
}
