import React from 'react'
import { useImageLoader } from '@/hooks/s3'

interface Props {
    s3Key: string
}

export default function ReviewImage({ s3Key }: Props) {
    const { imageUrl, isLoading, error } = useImageLoader(s3Key)

    if (isLoading) {
        return <div className="w-[7.5rem] h-[7.5rem] bg-[#D9D9D9] rounded animate-pulse" />
    }

    if (error) {
        return (
            <div className="w-[7.5rem] h-[7.5rem] bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">이미지 로드 실패</div>
        )
    }

    return <img className="w-[7.5rem] h-[7.5rem] object-cover object-center" alt={`review img`} src={imageUrl} />
}
