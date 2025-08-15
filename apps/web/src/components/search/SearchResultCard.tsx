'use client'

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
    return (
        <article className="w-full">
            <div className="rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={title} className="w-full object-cover" style={{ height: imageHeight }} loading="lazy" />
            </div>

            <h2 className="mt-3 text-[16px] font-semibold">{title}</h2>
            <p className="mt-1 text-[13px] text-gray-400">{region}</p>
            <p className="mt-1 text-[13px] text-gray-500">{period}</p>
        </article>
    )
}
