import { useEffect, useState } from 'react'

const useKeyboardOpen = () => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

    useEffect(() => {
        const initialHeight = window.innerHeight
        const handler = () => {
            const diff = initialHeight - window.innerHeight
            setIsKeyboardOpen(diff > 120)
        }
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    return isKeyboardOpen
}

export default useKeyboardOpen
