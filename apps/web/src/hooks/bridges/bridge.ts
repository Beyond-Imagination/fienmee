import { useEffect } from 'react'

const messageHandler = (event: MessageEvent) => {
    const message = JSON.parse(event.data)
    if (message.type === 'jwt') {
        // TODO: save jwt
        // alert(message.jwt)
    }
}

export function useBridge() {
    useEffect(() => {
        document.addEventListener('message', messageHandler as EventListener) // android
        window.addEventListener('message', messageHandler) // ios
    }, [])
}
