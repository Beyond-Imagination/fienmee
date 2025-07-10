import { useState, useEffect } from 'react'
import { getViewUrl } from '@/api/s3'

export const useImageLoader = (s3KeyOrUrl: string) => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const loadImage = async () => {
            if (!s3KeyOrUrl) {
                if (isMounted) {
                    setImageUrl('')
                    setIsLoading(false)
                    setError(null)
                }
                return
            }

            setIsLoading(true)
            setError(null)

            if (s3KeyOrUrl.startsWith('http://') || s3KeyOrUrl.startsWith('https://')) {
                if (isMounted) {
                    setImageUrl(s3KeyOrUrl)
                    setIsLoading(false)
                }
            } else {
                try {
                    const { presignedUrl } = await getViewUrl(s3KeyOrUrl)
                    if (isMounted) {
                        setImageUrl(presignedUrl)
                    }
                } catch (err) {
                    console.error('Error fetching presigned URL:', err)
                    if (isMounted) {
                        setError('Failed to load image from S3 key')
                        setImageUrl('')
                    }
                } finally {
                    if (isMounted) {
                        setIsLoading(false)
                    }
                }
            }
        }

        loadImage()

        return () => {
            isMounted = false
        }
    }, [s3KeyOrUrl])

    return { imageUrl, isLoading, error }
}
