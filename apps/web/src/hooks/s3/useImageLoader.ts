import { useState, useEffect } from 'react'
import { getViewUrl } from '@/api/s3'

interface ImageState {
    imageUrl: string
    isLoading: boolean
    error: string | null
}

export const useImageLoader = (s3KeyOrUrl: string): ImageState => {
    const [state, setState] = useState<ImageState>({
        imageUrl: '',
        isLoading: true,
        error: null,
    })

    useEffect(() => {
        let isMounted = true

        const loadImage = async () => {
            const newState: ImageState = {
                imageUrl: '',
                isLoading: true,
                error: null,
            }

            if (!s3KeyOrUrl) {
                newState.isLoading = false
                if (isMounted) setState(newState)
                return
            }

            if (s3KeyOrUrl.startsWith('http://') || s3KeyOrUrl.startsWith('https://')) {
                newState.isLoading = false
                newState.imageUrl = s3KeyOrUrl
            } else {
                try {
                    const { presignedUrl } = await getViewUrl(s3KeyOrUrl)
                    newState.imageUrl = presignedUrl
                } catch (err) {
                    console.error('Error fetching presigned URL:', err)
                    newState.imageUrl = ''
                    newState.error = 'Failed to load image from S3 key'
                } finally {
                    newState.isLoading = false
                }
            }
            if (isMounted) setState(newState)
        }

        loadImage()

        return () => {
            isMounted = false
        }
    }, [s3KeyOrUrl])

    return state
}
