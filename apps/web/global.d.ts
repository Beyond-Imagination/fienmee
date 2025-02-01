export declare global {
    interface Window {
        ReactNativeWebView: {
            postMessage: (value: string) => void
        }
    }
}
