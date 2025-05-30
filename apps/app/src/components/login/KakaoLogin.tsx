import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { login as kakaoLogin } from '@react-native-seoul/kakao-login'

import { INotificationToken, isErrorResponse } from '@fienmee/types'

import { login } from '@/api'
import { setToken } from '@/stores'
import { LoginScreenProps } from '@/types'
import { refreshFCMToken } from '@/api/notification.ts'
import PushNotificationService from '@/services/pushNotificationService'

export function KakaoOauthLogin() {
    const navigation = useNavigation<LoginScreenProps['navigation']>()
    const onPress = async () => {
        const token = await kakaoLogin()
        try {
            const credential = await login({
                ...token,
                provider: 'KAKAO',
            })
            await setToken(credential)
            const fcmRequest: INotificationToken = {
                token: PushNotificationService.token,
                deviceId: PushNotificationService.deviceId,
                platform: PushNotificationService.platform,
            }
            await refreshFCMToken(fcmRequest)
            navigation.navigate('WebView')
        } catch (error) {
            if (isErrorResponse(error) && (error.code === 4100 || error.code === 4101)) {
                navigation.navigate('Register', {
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                    provider: 'KAKAO',
                })
            } else {
                navigation.navigate('Error')
            }
        }
    }

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FEE500' }]} onPress={onPress} activeOpacity={1}>
            <Image style={{ overflow: 'hidden', width: 24, height: 24 }} source={require('../../../assets/kakaoLoginLogo.png')} />
            <Text style={[styles.text, { color: '#000000d9' }]}>카카오 로그인</Text>
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
