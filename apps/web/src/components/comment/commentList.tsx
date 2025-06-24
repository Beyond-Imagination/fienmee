'use client'

import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import { IComment, IGetEventCommentsResponse } from '@fienmee/types'
import { getEventCommentsByEventId } from '@/api/event'
import { EventComment } from '@/components/comment/comment'

interface CommentListProps {
    eventId: string
}

interface UseCommentsQueryProps {
    eventId: string
    startPage: number
}

export function CommentList({ eventId }: CommentListProps) {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useCommentsQuery({
        eventId,
        startPage: 1,
    })
    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, isFetchingNextPage, fetchNextPage])

    if (isLoading) {
        return (
            <div className="px-4 py-2">
                {Array.from({ length: 10 }, (_, index) => (
                    <EventComment key={index} comment={{ nickname: '로딩 중', comment: '...' } as IComment} />
                ))}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="h-full flex items-center justify-center px-4">
                <div className="text-sm text-center text-gray-500">
                    댓글을 불러오는 데 실패했습니다. <br />
                    다시 시도해주세요.
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {data && data.pages.map(page => page.comments.map(comment => <EventComment key={comment._id} comment={comment} />))}
            {isFetchingNextPage ? <EventComment comment={{ nickname: '로딩 중', comment: '...' } as IComment} /> : <div ref={ref} />}
        </div>
    )
}

const useCommentsQuery = ({ eventId, startPage }: UseCommentsQueryProps) => {
    return useInfiniteQuery<IGetEventCommentsResponse>({
        queryKey: ['comments', eventId],
        queryFn: ({ pageParam }) => getEventCommentsByEventId(eventId, pageParam as number, 10),
        initialPageParam: startPage,
        getNextPageParam: lastPage => {
            if (lastPage.page.hasNextPage) {
                return lastPage.page.page + 1
            }
            return undefined
        },
        staleTime: 1000 * 30,
    })
}
