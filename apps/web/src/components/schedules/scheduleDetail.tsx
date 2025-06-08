import { IScheduleItem } from '@fienmee/types'
import { EventMap } from '@/components/events/eventMap'
import Link from 'next/link'
import { eventStore } from '@/store'
import { getEventDetail } from '@/api/event'
import ScheduleOption from '@/components/schedules/scheduleOption'

interface ScheduleDetailModalProps {
    isOpen: boolean
    onClose: () => void
    schedule: IScheduleItem
    setModalType: (type: string) => void
    openDeleteModal: () => void
}

export default function ScheduleDetailModal({ isOpen, onClose, schedule, setModalType, openDeleteModal }: ScheduleDetailModalProps) {
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

    if (!isOpen || !schedule) return null

    const formatTime = (date: Date) => {
        const newDate = new Date(date)
        return `${String(newDate.getMonth() + 1).padStart(2, '0')}.${String(newDate.getDate()).padStart(2, '0')} ${newDate.getHours()}:${String(newDate.getMinutes()).padStart(2, '0')} ${newDate.getHours() >= 12 ? 'PM' : 'AM'}`
    }
    const timeRange = schedule.isAllDay ? '하루 종일' : `${formatTime(schedule.startDate)} - ${formatTime(schedule.endDate)}`

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end" onClick={handleBackdropClick}>
            <div className="bg-white w-full h-[70%] rounded-t-2xl shadow-lg overflow-y-auto flex flex-col">
                <div className="p-10 flex-1 overflow-auto">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-semibold">{schedule.name}</div>
                        <ScheduleOption onEdit={() => setModalType('update')} onDelete={openDeleteModal} />
                    </div>
                    <div className="text-sm text-gray-400 mb-4">{timeRange}</div>
                    <hr className="border-t border-gray-300 mb-4" />
                    <div className="mb-4 py-2">
                        <div className="flex justify-between items-center mb-1 w-full">
                            <div className="text-m text-left">장소</div>
                            <div className="text-base font-semibold text-right">{schedule.address}</div>
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
        </div>
    )
}
