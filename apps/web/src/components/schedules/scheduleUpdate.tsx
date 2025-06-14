import React, { useState } from 'react'
import { IScheduleItem } from '@fienmee/types'
import { updateSchedule } from '@/api/schedules'
import EventTimeSelector from '@/components/events/eventTimeSelector'
import InputField from '@/components/events/inputField'
import EventVenueSelector from '@/components/events/eventVenueSelector'
import { scheduleStore } from '@/store/schedule'

interface ScheduleUpdateModalProps {
    isOpen: boolean
    onClose: () => void
    initSchedule: IScheduleItem
    setModalType: (type: string) => void
}

export default function ScheduleUpdateModal({ isOpen, onClose, initSchedule, setModalType }: ScheduleUpdateModalProps) {
    const { setSchedule } = scheduleStore()
    const [schedule, setScheduleForm] = useState<IScheduleItem>(initSchedule)

    const onClick = async () => {
        try {
            const newSchedule = await updateSchedule(schedule)
            setSchedule(newSchedule)
            setModalType('detail')
            alert('일정이 수정되었습니다.')
        } catch {
            alert('일정 수정에 실패했습니다.')
        }
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setScheduleForm(prevState => ({ ...prevState, [name]: value }))
    }

    const onStartDateTimeChange = (dateTime: string) => {
        setScheduleForm(prevState => ({ ...prevState, startDate: new Date(dateTime) }))
    }

    const onEndDateTimeChange = (dateTime: string) => {
        setScheduleForm(prevState => ({ ...prevState, endDate: new Date(dateTime) }))
    }

    if (!isOpen || !schedule) return null

    return (
        <div className="flex fixed inset-0 bg-black bg-opacity-40 z-50 items-end" onClick={handleBackdropClick}>
            <div className="relative w-full h-[70%] overflow-hidden">
                <div className="absolute grid grid-cols-5 w-[150%] h-full justify-between gap-2 -left-[25%]">
                    <div className="bg-white w-full h-full rounded-t-2xl shadow-lg" />
                    <div className="col-span-3 flex flex-col bg-white w-full h-full rounded-t-2xl shadow-lg overflow-auto">
                        <div className="py-10 px-8 flex-1 overflow-auto">
                            <div className="mb-4">
                                <InputField
                                    label="일정 이름"
                                    placeholder="일정 이름을 입력해주세요"
                                    value={schedule.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <hr className="border-t border-gray-300 mb-4" />
                            <div className="text-m text-left">일정 시간</div>
                            <EventTimeSelector
                                isAllDay={schedule.isAllDay}
                                toggleAllDay={() => setScheduleForm({ ...schedule, isAllDay: !schedule.isAllDay })}
                                initStartDate={schedule.startDate}
                                initEndDate={schedule.endDate}
                                onStartDateChange={onStartDateTimeChange}
                                onEndDateChange={onEndDateTimeChange}
                            />
                            <div className="mb-4 py-2">
                                <div className="mt-2 mb-4">
                                    <InputField
                                        label="장소"
                                        placeholder="장소를 입력해주세요"
                                        value={schedule.address}
                                        name="address"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mt-2 border border-gray-200 rounded-lg h-32 overflow-hidden">
                                    <EventVenueSelector
                                        initialPosition={{
                                            lat: schedule.location.coordinates[1],
                                            lng: schedule.location.coordinates[0],
                                        }}
                                        onPositionChange={newPosition =>
                                            setScheduleForm(prev => ({
                                                ...prev!,
                                                location: {
                                                    type: 'Point',
                                                    coordinates: [newPosition.lng, newPosition.lat],
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <hr className="border-t border-gray-300 mb-4" />
                            <div className="mb-4">
                                <InputField
                                    label="메모"
                                    placeholder="일정에 대한 메모를 작성해주세요"
                                    value={schedule.description}
                                    type="textarea"
                                    rows={4}
                                    name="description"
                                    onChange={handleChange}
                                />
                            </div>
                            <hr className="border-t border-gray-300 mb-4" />

                            <div className="px-14 py-4">
                                <button
                                    className="block text-center bg-[#FF9575] text-white py-3 rounded-lg w-full font-semibold"
                                    onClick={() => onClick()}
                                >
                                    저장하기
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white w-full h-full rounded-t-2xl shadow-lg" />
                </div>
            </div>
        </div>
    )
}
