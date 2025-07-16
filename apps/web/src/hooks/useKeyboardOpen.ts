import { useEffect, useState } from 'react'

const KEYBOARD_OPEN_THRESHOLD = 120

const useKeyboardOpen = () => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

    useEffect(() => {
        const initialHeight = window.innerHeight
        const handler = () => {
            const diff = initialHeight - window.innerHeight
            setIsKeyboardOpen(diff > KEYBOARD_OPEN_THRESHOLD)
        }
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    return isKeyboardOpen
}

export default useKeyboardOpen
