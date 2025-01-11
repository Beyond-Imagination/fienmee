'use client'

import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import { getEventsByCategory } from '@/api/event'
import { IGetEventsByCategoryResponse } from '@/types/event'
import Event from '@/components/events/event'

interface useEventsByCategoryQueryProps {
    category: string
    startPage: number
}

export function EventList({ category }: { category: string }) {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useEventsByCategoryQuery({
        category: category,
        startPage: 1,
    })
    const { ref, inView } = useInView()
    useEffect(() => {
        if (inView) {
            console.log('무한 스크롤 요청중')
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    if (isLoading) {
        return (
            <div className="h-full w-full">
                <div className="h-full w-full px-2 mt-4">
                    {Array.from({ length: 10 }, (_, index) => (
                        <Event event={undefined} key={index} />
                    ))}
                </div>
                {isFetchingNextPage ? <Event event={undefined} /> : <div ref={ref} />}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="h-screen flex items-center justify-center px-4">
                <div className="text-lg text-center">
                    행사를 불러오는 데 실패하였습니다.
                    <br />
                    다시 시도해 주시길 바랍니다.
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full">
            <div className="h-full w-full px-2 mt-4">
                {data && data.pages.map(events => events.events.map(event => <Event event={event} key={event._id} />))}
            </div>
            {isFetchingNextPage ? <Event event={undefined} /> : <div ref={ref} />}
        </div>
    )
}

const useEventsByCategoryQuery = ({ category, startPage }: useEventsByCategoryQueryProps) => {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<IGetEventsByCategoryResponse>({
        queryKey: ['events', category],
        queryFn: ({ pageParam }) => getEventsByCategory(category, pageParam as number, 10),
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
    })

    return { data, isLoading, isError, fetchNextPage, isFetchingNextPage }
}
