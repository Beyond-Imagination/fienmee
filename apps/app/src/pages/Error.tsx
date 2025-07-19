import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { getToken } from '@/stores'
import { ErrorScreenProps } from '@/types'
import { Logo } from '@/components/Logo'

export function ErrorScreen({ route }: ErrorScreenProps) {
    const navigation = useNavigation<ErrorScreenProps['navigation']>()

    const onPress = async () => {
        try {
            await getToken()
            navigation.navigate('WebView')
        } catch {
            navigation.navigate('Login')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Logo />
            </View>

            <Text style={styles.title}>오류가 발생했어요 😥</Text>
            <Text style={styles.message}>{route.params.message}</Text>

            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.buttonText}>돌아가기</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffce0',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    logoContainer: {
        width: '60%',
        height: 300,
        marginVertical: 30,
        alignItems: 'stretch',
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#9AD0C2',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 32,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
