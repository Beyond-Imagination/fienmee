'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

import { IGetNotificationListResponse } from '@fienmee/types'
import { getNotifications } from '@/api/notification'
import Notification from '@/components/notification/notification'
import NotificationSkeleton from '@/components/notification/notificatoinSkeleton'

export function NotificationList() {
    const { data, isLoading, isError, refetch, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<IGetNotificationListResponse>({
        queryKey: ['notifications', 'user1'], // TODO: change to user nickname
        queryFn: ({ pageParam }) => getNotifications(pageParam as number, 10),
        initialPageParam: 1,
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
    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    if (isLoading) {
        return (
            <div className="h-full w-full">
                <div className="flex flex-col">
                    {Array.from({ length: 10 }, (_, index) => (
                        <NotificationSkeleton key={index} />
                    ))}
                </div>
                {isFetchingNextPage ? <NotificationSkeleton /> : <div ref={ref} />}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col h-screen items-center justify-center px-4">
                <div className="text-lg text-center">
                    알림 내역을 불러오는 데 실패하였습니다.
                    <br />
                    다시 시도해 주시길 바랍니다.
                </div>
                <button onClick={() => refetch()} className="text-blue-500 underline mt-2">
                    다시 시도하기
                </button>
            </div>
        )
    }

    return (
        <div className="felx flex-col h-full w-full">
            {data &&
                data.pages.map(notifications =>
                    notifications.notifications.map(notification => <Notification notification={notification} key={notification._id} />),
                )}
            {isFetchingNextPage ? <NotificationSkeleton /> : <div ref={ref} />}
        </div>
    )
}
