import React from 'react'

import { StarIcon } from '@/components/icon'

export default function ReviewsStatistic() {
    // TODO: add get review data logic
    const stars = Array.from({ length: 5 }, (_, i) => i < 3.3)
    const statistic = [6, 8, 1, 6, 3]
    const maxCount = Math.max(...statistic)
    return (
        <div className="relative flex flex-row w-full gap-1.5 px-2.5">
            <div className="flex flex-col justify-center items-center py-[0.9375rem] gap-[0.3125rem]">
                <span className="text-2xl font-semibold">3.3</span>
                <div className="flex flex-row gap-[0.1875rem]">
                    {stars.map((star, index) => (
                        <div className="cursor-pointer" key={`review-statistic-star-${index}`}>
                            <StarIcon color={`${star ? '#F89B00' : '#CCCCCC'}`} width="1.25rem" height="1.25rem" stroke="" />
                        </div>
                    ))}
                </div>
                <span className="text-base text-[#757575]">평가 24개</span>
            </div>
            <div className="flex-1 flex flex-col px-[0.3125rem] gap-[0.3125rem]">
                {statistic.map((count, index) => (
                    <div className="flex flex-row justify-center items-center gap-[0.3125rem]" key={`review-statistic-bar-${index}`}>
                        <span className="text-sm font-bold text-nowrap">{5 - index}점</span>
                        <div className="relative flex-1 h-1 bg-[#E5E5EA] rounded">
                            <div
                                className="absolute top-0 left-0 h-1 bg-[#F89B00] rounded"
                                style={{ width: `${Math.floor((count / maxCount) * 100)}%` }}
                            />
                        </div>
                        <span className="text-sm font-semibold text-[#757575] text-nowrap">{count}</span>
                    </div>
                ))}
            </div>
            {/*TODO: disabled overlay*/}
            <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-white/70 z-10 backdrop-blur-sm">
                <span className="text-sm font-bold">리뷰 통계 기능은 준비 중입니다</span>
            </div>
        </div>
    )
}
