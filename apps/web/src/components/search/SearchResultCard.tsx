'use client'

import { useMemo } from 'react'
import { ClipLoader } from 'react-spinners'

import { useImageLoader } from '@/hooks/s3/useImageLoader'

const FALLBACK_IMAGE = 'https://picsum.photos/seed/fallback/600/400'

export default function SearchResultCard({
    title,
    region,
    period,
    image,
    imageHeight,
}: {
    title: string
    region: string
    period: string
    image: string
    imageHeight?: number
}) {
    const { imageUrl, isLoading } = useImageLoader(image)

    const resolvedSrc = useMemo(() => {
        if (imageUrl) return imageUrl
        return FALLBACK_IMAGE
    }, [imageUrl])

    return (
        <article className="w-full">
            <div className="rounded-2xl overflow-hidden" style={{ height: imageHeight }}>
                {isLoading ? (
                    <div className="flex h-full items-center justify-center bg-gray-100">
                        <ClipLoader color="#FF6B6B" size={28} />
                    </div>
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={resolvedSrc} alt={title} className="w-full h-full object-cover" loading="lazy" />
                )}
            </div>

            <h2 className="mt-3 text-[16px] font-semibold">{title}</h2>
            <p className="mt-1 text-[13px] text-gray-400">{region}</p>
            <p className="mt-1 text-[13px] text-gray-500">{period}</p>
        </article>
    )
}
