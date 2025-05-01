import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { ErrorScreenProps } from '@/types'
import { getToken } from '@/stores'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export function ErrorScreen() {
    const navigation = useNavigation<ErrorScreenProps['navigation']>()

    const onPress = async () => {
        try {
            await getToken()
            navigation.navigate('WebView')
        } catch {
            navigation.navigate('Login')
        }
    }

    // TODO: error page 디자인 적용하기
    return (
        <View style={[styles.container, { padding: 30, backgroundColor: '#FFFFFF' }]}>
            <Text>error page</Text>
            <TouchableOpacity onPress={onPress}>
                <Text>go to home</Text>
            </TouchableOpacity>
        </View>
    )
}
