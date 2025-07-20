import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { LoginScreenProps } from '@/types'

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
