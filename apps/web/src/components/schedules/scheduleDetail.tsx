import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'

import { IScheduleItem } from '@fienmee/types'
import { getEventDetail } from '@/api/event'
import { EventMap } from '@/components/events/eventMap'
import ScheduleOption from '@/components/schedules/scheduleOption'
import { eventStore } from '@/store'

interface ScheduleDetailModalProps {
    isOpen: boolean
    onClose: () => void
    schedule: IScheduleItem
    setModalType: (type: string) => void
    openDeleteModal: () => void
    onPrev: () => void
    onNext: () => void
}

export default function ScheduleDetailModal({ isOpen, onClose, schedule, setModalType, openDeleteModal, onNext, onPrev }: ScheduleDetailModalProps) {
    const dragStartX = useRef<number | null>(null)
    const [dragX, setDragX] = useState(0)
    const { setEvent } = eventStore()

    const onClick = async (eventId: string) => {
        const event = await getEventDetail(eventId)
        setEvent(event)
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const hanldeTouchStart = (e: React.TouchEvent) => {
        dragStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (dragStartX.current === null) {
            return
        }
        const currentX = e.touches[0].clientX
        setDragX(currentX - dragStartX.current)
    }

    const handleTouchEnd = () => {
        if (dragX >= 40) {
            onPrev()
        } else if (dragX <= -40) {
            onNext()
        }
        setDragX(0)
        dragStartX.current = null
    }

    if (!isOpen || !schedule) return null

    const formatTime = (date: Date) => {
        const newDate = new Date(date)
        return format(newDate, 'MM.dd HH:mm a')
    }
    const timeRange = schedule.isAllDay ? '하루 종일' : `${formatTime(schedule.startDate)} - ${formatTime(schedule.endDate)}`

    return (
        <div className="flex fixed inset-0 bg-black bg-opacity-40 z-50 items-end" onClick={handleBackdropClick}>
            <div className="relative w-full h-[70%] overflow-hidden">
                <div
                    className="absolute grid grid-cols-5 w-[150%] h-full justify-between gap-2 -left-[25%]"
                    style={{
                        transform: `translateX(${dragX > 0 ? Math.min(40, dragX) : Math.max(-40, dragX)}px)`,
                        transition: dragX === 0 ? 'transform 0.3s ease' : 'none',
                    }}
                    onTouchMove={handleTouchMove}
                    onTouchStart={hanldeTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="bg-white w-full h-full rounded-t-2xl shadow-lg" />
                    <div className="col-span-3 flex flex-col bg-white w-full h-full rounded-t-2xl shadow-lg overflow-auto">
                        <div className="py-10 px-8 flex-1 overflow-auto">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-lg font-semibold">{schedule.name}</div>
                                <ScheduleOption onEdit={() => setModalType('update')} onDelete={openDeleteModal} />
                            </div>
                            <div className="text-sm text-gray-400 mb-4">{timeRange}</div>
                            <hr className="border-t border-gray-300 mb-4" />
                            <div className="mb-4 py-2">
                                <div className="flex justify-between items-start mb-1 w-full">
                                    <div className="text-left whitespace-nowrap">장소</div>
                                    <div className="font-semibold text-right whitespace-break-spaces">{schedule.address}</div>
                                </div>
                                <div className="mt-2 border border-gray-200 rounded-lg h-32 overflow-hidden">
                                    <EventMap lng={schedule.location.coordinates[0]} lat={schedule.location.coordinates[1]} />
                                </div>
                            </div>
                            <hr className="border-t border-gray-300 mb-4" />
                            <div className="mb-4">
                                <div className="text-m">메모</div>
                                <div className="text-sm text-gray-500 whitespace-pre-line">{schedule.description || '작성된 메모가 없습니다.'}</div>
                            </div>
                            <hr className="border-t border-gray-300 mb-4" />
                        </div>
                        <div className="px-14 py-4">
                            <Link
                                className="block text-center bg-[#FF9575] text-white py-3 rounded-lg w-full font-semibold"
                                href={`/events/detail`}
                                onClick={() => onClick(schedule.eventId)}
                            >
                                행사 더 자세히 보러 가기
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white w-full h-full rounded-t-2xl shadow-lg" />
                </div>
            </div>
        </div>
    )
}
