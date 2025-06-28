'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'

import { IGetReviewResponse } from '@fienmee/types'
import { getReview } from '@/api/review'
import Review from '@/components/review/review'
import { InfoIcon } from '@/components/icon'
import { eventStore } from '@/store'

interface useReviewsQueryProps {
    eventId: string
    startPage: number
}

export default function ReviewList() {
    const { event } = eventStore()
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage, refetch } = useReviewQuery({ eventId: event._id, startPage: 1 })
    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    if (isLoading) {
        return (
            <div className="flex flex-col h-full w-full gap-2.5 py-2.5">
                {Array.from({ length: 10 }, (_, index) => (
                    <Review review={undefined} key={index} />
                ))}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col w-full h-full justify-center items-center gap-4 pt-6">
                <div className="w-full text-center text-xl font-semibold">
                    리뷰를 불러오는 데 문제가 발생했습니다.
                    <br />
                    이용에 불편을 드려 죄송합니다.
                </div>
                <div className="bg-[#D9D9D9] py-1 px-3 rounded" onClick={() => refetch()}>
                    다시 시도하기
                </div>
            </div>
        )
    }

    if (data && data.pages[0].page.totalDocs === 0) {
        return (
            <div className="flex flex-col w-full h-full justify-center items-center gap-4 pt-2">
                <InfoIcon color="#757575" stroke="#757575" width="5rem" height="5rem" />
                <span className="w-full text-center text-xl text-[#757575] font-semibold">아직 작성된 리뷰가 없어요</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full gap-2.5 py-2.5">
            {data && data.pages.map(page => page.reviews.map(review => <Review key={review._id} review={review} />))}
            {isFetchingNextPage ? <Review review={undefined} /> : <div ref={ref} />}
        </div>
    )
}

const useReviewQuery = ({ eventId, startPage }: useReviewsQueryProps) => {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<IGetReviewResponse>({
        queryKey: ['review', eventId],
        queryFn: ({ pageParam }) => getReview(eventId, pageParam as number, 5),
        initialPageParam: startPage,
        getNextPageParam: lastPage => {
            if (lastPage.page.hasNextPage) {
                return lastPage.page.page + 1
            }
        },
        getPreviousPageParam: lastPage => {
            if (lastPage.page.hasPrevPage) {
                return lastPage.page.page - 1
            }
        },
        staleTime: 1000 * 30,
    })

    return { data, isLoading, isError, fetchNextPage, isFetchingNextPage, refetch }
}
