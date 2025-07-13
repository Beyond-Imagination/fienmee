import React from 'react'
import { format } from 'date-fns'

import { IReview } from '@fienmee/types'
import { StarIcon } from '@/components/icon'
import ReviewImage from '@/components/review/ReviewImage'

interface Props {
    review: IReview | undefined
}

export default function Review({ review }: Props) {
    if (!review) {
        return (
            <div className="flex flex-col w-full gap-2.5 mt-2.5 animate-pulse">
                <div className="h-6 bg-[#D9D9D9] mx-2.5 pt-[0.3125rem] rounded" />
                <div className="overflow-x-auto scroll-smooth snap-x mx-2.5">
                    <div className="flex flex-row w-max gap-[0.3125rem]">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={`review-loading-${index}`} className="w-[7.5rem] h-[7.5rem] bg-[#D9D9D9] rounded" />
                        ))}
                    </div>
                </div>
                <div className="h-[7.5rem] mx-2.5 my-1.5 bg-[#D9D9D9] rounded" />
                <div className="border-b border-b-gray-300 pb-2.5 mx-2.5" />
            </div>
        )
    }

    const stars = Array.from({ length: 5 }, (_, i) => i < review.rating)

    return (
        <div className="flex flex-col w-full gap-2.5 pt-2.5 overflow-hidden">
            <div className="flex flex-col gap-[0.3125rem] px-2.5 pt-[0.3125rem]">
                <span className="text-sm">{review.userId.nickname}</span>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-1.5">
                        <div className="flex flex-row gap-[0.1875rem]">
                            {stars.map((star, index) => (
                                <div className="cursor-pointer" key={`${review._id}-star-${index}`}>
                                    <StarIcon color={`${star ? '#F89B00' : '#CCCCCC'}`} width="0.9375rem" height="0.875rem" stroke="" />
                                </div>
                            ))}
                        </div>
                        <div className="border-l border-l-[#CCCCCC]" />
                        <span className="text-xs text-[#757575]">{format(review.createdAt, 'yyyy.MM.dd HH:mm')}</span>
                    </div>
                </div>
            </div>
            {review.photo.length !== 0 && (
                <div className="overflow-x-auto scroll-smooth snap-x px-2.5">
                    <div className="flex flex-row w-max gap-[0.3125rem]">
                        {review.photo.map((s3Key, index) => (
                            <ReviewImage key={`${review._id}-reviewImg-${index}`} s3Key={s3Key} />
                        ))}
                    </div>
                </div>
            )}
            <p className="text-justify text-wrap break-words text-sm px-2.5 py-1.5">{review.body}</p>
            <div className="border-b border-b-gray-300 mx-2.5 pb-2.5" />
        </div>
    )
}
