import { Image, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    logoImage: {
        width: '100%',
        height: '100%',
    },
})

export function Logo() {
    return <Image source={require('./../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
}
