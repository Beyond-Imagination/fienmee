declare module 'react-native-config' {
    export interface NativeConfig {
        ENV: string
        FE_URL: string
        BE_URL: string
        GOOGLE_CLIENT_ID: string
    }

    export const Config: NativeConfig
    export default Config
}
