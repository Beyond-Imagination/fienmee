import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { login as kakaoLogin } from '@react-native-seoul/kakao-login'

import { login } from '../../api'
import { setToken } from '../../stores/token'

export function KakaoOauthLogin() {
    const navigation = useNavigation()
    const onPress = async () => {
        const token = await kakaoLogin()
        try {
            const { accessToken } = await login({
                ...token,
                provider: 'KAKAO',
            })
            await setToken(accessToken)
            navigation.navigate('WebView')
        } catch (error) {
            // TODO: login 실패 에러 확인후 회원가입페이지로 이동
            console.error(error)
        }

        navigation.navigate('WebView') // 임시 코드
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
