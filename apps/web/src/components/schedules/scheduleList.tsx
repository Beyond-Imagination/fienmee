import ScheduleItem from '@/components/schedules/scheduleItem'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getSchedulesByDate } from '@/api/schedules'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { IScheduleItem } from '@fienmee/types'
import ScheduleDetailModal from '@/components/schedules/scheduleDetail'
import ScheduleUpdateModal from '@/components/schedules/scheduleUpdate'
import ScheduleDeleteModal from '@/components/schedules/scheduleDeleteModal'
import { scheduleStore } from '@/store/schedule'

interface Prop {
    date: Date
}

interface IScheduleSummary {
    id: string
    title: string
    time: string
}

export default function ScheduleList({ date }: Prop) {
    const { data, isLoading, isError, fetchNextPage } = useSchedulesByDate({ date: date, startPage: 1, limit: 5 })
    const { ref, inView } = useInView()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { schedule, setSchedule } = scheduleStore()
    const [modalType, setModalType] = useState<string>('none')

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    const handleClick = (scheduleId: string) => {
        const selectedSchedule = data?.pages[0].docs?.find((doc: IScheduleItem) => doc._id === scheduleId)
        if (selectedSchedule) {
            setSchedule(selectedSchedule)
            setIsModalOpen(true)
            setModalType('detail')
        }
    }

    const handleClose = () => {
        setIsModalOpen(false)
        setModalType('none')
    }

    if (isError) {
        return (
            <div className="flex w-full items-center justify-center px-4 pt-4 bg-white border-t border-t-[#E4E4E4]">
                <div className="text-lg text-center">
                    <h1>일정을 불러오는 것을 실패하였습니다.</h1>
                    <p>다시 시도해주세요</p>
                </div>
            </div>
        )
    }

    let scheduleSummary
    if (!isLoading) {
        scheduleSummary = data?.pages[0].docs?.map((doc: IScheduleItem) => {
            const newDate = new Date(doc.startDate)
            const hours = String(newDate.getHours()).padStart(2, '0')
            const minutes = String(newDate.getMinutes()).padStart(2, '0')
            return { id: doc._id, title: doc.name, time: `${hours}:${minutes}` }
        })
    }
    return (
        <div className="bg-white w-full border-t border-t-[#E4E4E4]">
            <div className="ml-5 mt-6 mb-3 text-xl font-bold text-left">{String(date.getDate()).padStart(2, '0')}일 일정</div>
            <div>
                {scheduleSummary &&
                    scheduleSummary.map((schedule: IScheduleSummary) => (
                        <ScheduleItem key={schedule.id} {...schedule} onClick={() => handleClick(schedule.id)} />
                    ))}
            </div>
            <div ref={ref}></div>

            {modalType === 'detail' && (
                <ScheduleDetailModal isOpen={isModalOpen} onClose={handleClose} schedule={schedule} setModalType={setModalType} />
            )}
            {modalType === 'update' && (
                <ScheduleUpdateModal isOpen={isModalOpen} onClose={handleClose} initSchedule={schedule} setModalType={setModalType} />
            )}
            {modalType === 'delete' && (
                <ScheduleDeleteModal isOpen={isModalOpen} onClose={handleClose} scheduleId={schedule._id} setModalType={setModalType} />
            )}
        </div>
    )
}

const useSchedulesByDate = ({ date, startPage, limit }: { date: Date; startPage: number; limit: number }) => {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['schedules', date],
        queryFn: ({ pageParam }) => getSchedulesByDate(date, pageParam, limit),
        initialPageParam: startPage,
        getNextPageParam: lastPage => {
            if (lastPage.hasNextPage) {
                return lastPage.nextPage
            }
        },
        getPreviousPageParam: lastPage => {
            if (lastPage.hasPrevPage) {
                return lastPage.nextPage
            }
        },
    })
    return { data, isLoading, isError, fetchNextPage, isFetchingNextPage }
}
