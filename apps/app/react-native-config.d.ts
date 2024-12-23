declare module 'react-native-config' {
    export interface NativeConfig {
        ENV: string
        FE_URL: string
        BE_URL: string
    }

    export const Config: NativeConfig
    export default Config
}
