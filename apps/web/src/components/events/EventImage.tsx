import React, { useState } from 'react'
import { useImageLoader } from '@/hooks/s3/useImageLoader'
import { ClipLoader } from 'react-spinners'

interface EventImageProps {
    s3Key: string
    alt: string
    className?: string
}

const EventImage: React.FC<EventImageProps> = ({ s3Key, alt, className }) => {
    const { imageUrl, isLoading } = useImageLoader(s3Key)
    const [hasError, setHasError] = useState(false)

    if (isLoading) {
        return (
            <div className={`flex items-center justify-center ${className || ''}`}>
                <ClipLoader color="#FF9575" size={20} />
            </div>
        )
    }

    if (hasError || !imageUrl) {
        return <div className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className || ''}`}>이미지 로드 실패</div>
    }

    return <img src={imageUrl} alt={alt} className={className} onError={() => setHasError(true)} />
}

export default EventImage
