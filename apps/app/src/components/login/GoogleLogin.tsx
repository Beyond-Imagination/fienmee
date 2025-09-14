import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GoogleSignin, isErrorWithCode, SignInSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin'

import { LoginScreenProps } from '@/types'
import { getGoogleRefreshToken, login } from '@/api'
import { isErrorResponse } from '@fienmee/types/api'
import { setToken } from '@/stores'

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
            if (isErrorResponse(error)) {
                if (error.code === 4100 || error.code === 4101) {
                    navigation.navigate('Register', {
                        accessToken: tokens.accessToken,
                        refreshToken: refreshToken,
                        provider: 'GOOGLE',
                    })
                } else if (isErrorWithCode(error)) {
                    switch (error.code) {
                        case statusCodes.SIGN_IN_CANCELLED:
                            navigation.navigate('Error', {
                                message: '취소된 로그인 요청입니다. 다시 시도해주세요.',
                            })
                            break
                        case statusCodes.IN_PROGRESS:
                            navigation.navigate('Error', {
                                message: '다시 시도해주세요.',
                            })
                            break
                    }
                } else {
                    navigation.navigate('Error', error)
                }
            } else {
                navigation.navigate('Error', {
                    message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
                })
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
