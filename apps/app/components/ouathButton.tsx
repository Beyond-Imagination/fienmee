import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native'

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        height: 60,
        width: '80%',
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        paddingLeft: 20,
        paddingBottom: 5,
        width: '70%',
    },
})

export function KakaoOauthLogin() {
    const onPress = () => {
        // TODO: implement logic
    }
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FEE500' }]} onPress={onPress} activeOpacity={1}>
            <Image style={{ overflow: 'hidden', width: 24, height: 24 }} source={require('../assets/kakaoLoginLogo.png')} />
            <Text style={[styles.text, { color: '#000000d9' }]}>카카오 로그인</Text>
        </TouchableOpacity>
    )
}

export function NaverOauthLogin() {
    const onPress = () => {
        // TODO: implement logic
    }
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#03C75A' }]} onPress={onPress} activeOpacity={1}>
            <Image style={{ overflow: 'hidden', width: 32, height: 32 }} source={require('../assets/naverLoginLogo.png')} />
            <Text style={[styles.text, { color: '#FFFFFF' }]}>네이버 로그인</Text>
        </TouchableOpacity>
    )
}

export function GoogleOauthLogin() {
    const onPress = () => {
        // TODO: implement logic
    }
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FFFFFF', borderColor: '#E5E5EA', borderWidth: 1 }]}
            onPress={onPress}
            activeOpacity={1}
        >
            <Image style={{ overflow: 'hidden', width: 24, height: 24 }} source={require('../assets/googleLoginLogo.png')} />
            <Text style={[styles.text, { color: '#000000' }]}>Google 로그인</Text>
        </TouchableOpacity>
    )
}

export function AppleOauthLogin() {
    const onPress = () => {
        // TODO: implement logic
    }
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#000000' }]} onPress={onPress} activeOpacity={1}>
            <Image style={{ overflow: 'hidden', width: 24, height: 50 }} source={require('../assets/appleLoginLogo.png')} />
            <Text style={[styles.text, { color: '#FFFFFF' }]}>Apple 로그인</Text>
        </TouchableOpacity>
    )
}
