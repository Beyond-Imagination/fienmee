import ScheduleItem from '@/components/schedules/scheduleItem'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getSchedulesByDate } from '@/api/schedules'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { IScheduleDocType } from '@fienmee/types'

interface Prop {
    date: Date
}

interface IScheduleSummary {
    id: string
    title: string
    time: string
}

export default function ScheduleList({ date }: Prop) {
    const formatDate = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const { data, isLoading, isError, fetchNextPage } = useSchedulesByDate({ date: date, startPage: 1, limit: 5 })
    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    if (isError) {
        return (
            <div className="h-screen flex items-center justify-center px-4">
                <div className="text-lg text-center">
                    <h1>일정을 불러오는 것을 실패하였습니다.</h1>
                    <p>다시 시도해주세요</p>
                </div>
            </div>
        )
    }

    let schedules
    if (!isLoading) {
        schedules = data?.pages[0]?.docs?.map((doc: IScheduleDocType) => {
            const hours = new Date(doc.startDate).getHours()
            const minutes = new Date(doc.startDate).getMinutes()
            return { id: doc._id, title: doc.name, time: `${hours}:${minutes}` }
        })
    }
    return (
        <div>
            <div className="ml-5 mt-6 mb-3 text-xl font-bold text-left">{formatDate(date)} 일정</div>
            <div>{schedules && schedules.map((schedule: IScheduleSummary) => <ScheduleItem key={schedule.id} {...schedule} />)}</div>
            <div ref={ref}></div>
        </div>
    )
}

const useSchedulesByDate = ({ date, startPage, limit }: { date: Date; startPage: number; limit: number }) => {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['schedules', date],
        queryFn: ({ pageParam }) => getSchedulesByDate(date, pageParam, limit),
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
