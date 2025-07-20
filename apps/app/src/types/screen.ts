import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
    Login: undefined
    Register: {
        accessToken: string
        refreshToken: string
        provider: string
    }
    WebView: undefined
    Error: {
        message: string
    }
}

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>
export type WebviewScreenProps = NativeStackScreenProps<RootStackParamList, 'WebView'>
export type ErrorScreenProps = NativeStackScreenProps<RootStackParamList, 'Error'>
