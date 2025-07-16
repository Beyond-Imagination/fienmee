'use client'

import { useEffect } from 'react'

export default function ViewportHeightSetter() {
    useEffect(() => {
        let initialHeight = window.innerHeight
        let debounceTimeout: ReturnType<typeof setTimeout> | null = null

        const setViewportHeight = () => {
            document.documentElement.style.setProperty('--app-height', `${initialHeight}px`)
        }

        const handleResize = () => {
            if (debounceTimeout) clearTimeout(debounceTimeout)

            debounceTimeout = setTimeout(() => {
                if (window.innerHeight < initialHeight) return
                initialHeight = window.innerHeight
                setViewportHeight()
            }, 100)
        }

        window.addEventListener('resize', handleResize)
        setViewportHeight()

        return () => {
            window.removeEventListener('resize', handleResize)
            if (debounceTimeout) clearTimeout(debounceTimeout)
        }
    }, [])

    return null
}
