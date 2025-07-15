'use client'

import { useEffect } from 'react'

export default function ViewportHeightSetter() {
    useEffect(() => {
        let initialHeight = window.innerHeight
        const setViewportHeight = () => {
            document.documentElement.style.setProperty('--app-height', `${initialHeight}px`)
        }

        const handleResize = () => {
            if (window.innerHeight < initialHeight) {
                return
            }
            initialHeight = window.innerHeight
            setViewportHeight()
        }

        window.addEventListener('resize', handleResize)
        setViewportHeight()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return null
}
