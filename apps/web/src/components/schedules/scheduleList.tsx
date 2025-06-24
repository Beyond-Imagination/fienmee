import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ClipLoader } from 'react-spinners'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getSchedulesByDate } from '@/api/schedules'
import ScheduleItem from '@/components/schedules/scheduleItem'
import ScheduleDetailModal from '@/components/schedules/scheduleDetail'
import ScheduleUpdateModal from '@/components/schedules/scheduleUpdate'
import ScheduleDeleteModal from '@/components/schedules/scheduleDeleteModal'
import { scheduleStore } from '@/store/schedule'

interface Prop {
    date: Date
}

export default function ScheduleList({ date }: Prop) {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useSchedulesByDate({ date: date, startPage: 1, limit: 5 })
    const { ref, inView } = useInView()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState<string>('none')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [index, setIndex] = useState<number[]>([0, 0])
    const { schedule, setSchedule } = scheduleStore()

    useEffect(() => {
        if (inView && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    const handleClick = (i: number, j: number) => {
        setIndex([i, j])
        const schedule = data?.pages[i].docs[j]
        if (schedule) {
            setSchedule(schedule)
            setIsModalOpen(true)
            setModalType('detail')
        }
    }

    const handleNext = () => {
        let [i, j] = index
        const curDocs = data?.pages[i]
        if (curDocs) {
            if (j < curDocs.docs.length - 1) {
                j++
            } else if (i < data.pages.length - 1) {
                i++
                j = 0
            } else {
                return
            }
            handleClick(i, j)
        }
    }

    const handlePrev = () => {
        let [i, j] = index
        const curDocs = data?.pages[i]
        if (curDocs) {
            if (j > 0) {
                j--
            } else if (i > 0) {
                i--
                j = data?.pages[i].docs.length - 1
            } else {
                return
            }
            handleClick(i, j)
        }
    }

    const handleClose = () => {
        setIsModalOpen(false)
        setModalType('none')
        setIsDeleteModalOpen(false)
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

    if (isLoading) {
        return (
            <div className="bg-white w-full border-t border-t-[#E4E4E4]">
                <div className="ml-5 mt-6 mb-3 text-xl font-bold text-left">{String(date.getDate()).padStart(2, '0')}일 일정</div>
                <div className="flex justify-center">
                    <ClipLoader color="#FF6B6B" size={50} />
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white w-full border-t border-t-[#E4E4E4] pb-3">
            <div className="text-xl font-bold text-left px-4 pb-3 pt-6">{String(date.getDate()).padStart(2, '0')}일 일정</div>
            <div className="flex flex-col">
                {data &&
                    data.pages.map((docs, i) =>
                        docs.docs.map((schedule, j) => (
                            <ScheduleItem
                                key={schedule._id}
                                title={schedule.name}
                                startDate={schedule.startDate}
                                endDate={schedule.endDate}
                                onClick={() => handleClick(i, j)}
                            />
                        )),
                    )}
            </div>
            {isFetchingNextPage ? (
                <div className="bg-white p-4 animate-pulse">
                    <div className="w-full h-6 bg-[#D9D9D9] my-2 rounded-lg" />
                    <div className="w-2/3 h-3 bg-[#D9D9D9] my-2 rounded-lg" />
                </div>
            ) : (
                <div ref={ref} />
            )}

            {modalType === 'detail' && (
                <ScheduleDetailModal
                    isOpen={isModalOpen}
                    onClose={handleClose}
                    schedule={schedule}
                    setModalType={setModalType}
                    openDeleteModal={() => setIsDeleteModalOpen(true)}
                    onNext={() => handleNext()}
                    onPrev={() => handlePrev()}
                />
            )}

            {modalType === 'update' && (
                <ScheduleUpdateModal isOpen={isModalOpen} onClose={handleClose} initSchedule={schedule} setModalType={setModalType} />
            )}

            {isDeleteModalOpen && (
                <ScheduleDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    scheduleId={schedule._id}
                    setModalType={setModalType}
                />
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
