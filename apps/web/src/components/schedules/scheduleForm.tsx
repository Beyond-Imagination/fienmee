'use client'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { IMakeNewScheduleRequest } from '@fienmee/types'
import { registerSchedule } from '@/api/schedules'
import EventTimeSelector from '@/components/events/eventTimeSelector'
import InputField from '@/components/events/inputField'
import { eventStore } from '@/store'
import EventVenueSelector from '@/components/events/eventVenueSelector'

export default function ScheduleForm() {
    const router = useRouter()
    const { event } = eventStore()
    const [formData, setFormData] = useState<IMakeNewScheduleRequest>({
        name: event.name,
        eventId: event._id === '' ? undefined : event._id,
        isAllDay: event.isAllDay,
        startDate: event.startDate,
        endDate: event.endDate,
        description: '',
        address: event.address,
        location: event.location,
    })
    const onStartDateTimeChange = (dateTime: string) => {
        setFormData(prevState => ({ ...prevState, startDate: new Date(dateTime) }))
    }

    const onEndDateTimeChange = (dateTime: string) => {
        setFormData(prevState => ({ ...prevState, endDate: new Date(dateTime) }))
    }

    const onPositionChange = (position: { lat: number; lng: number }) => {
        setFormData(prevState => ({ ...prevState, location: { type: 'Point', coordinates: [position.lng, position.lat] } }))
    }

    const onAddressChange = (address: string) => {
        setFormData(prevState => ({ ...prevState, address }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // todo: add logic for validating and organizing request body object
        if (!formData.isAllDay && formData.endDate <= formData.startDate) {
            toast.error(<span>종료 날짜와 시간은 시작 날짜와 시간보다 이후여야 합니다.</span>)
            return
        }
        try {
            await registerSchedule(formData)
            toast.success(<span>일정이 성공적으로 등록되었어요.</span>)
            router.push('/')
        } catch (error) {
            console.error('일정 등록 실패:', error)
            toast.error(<span>일정 등록을 실패했어요. 다시 한번 시도해 주세요.</span>)
        }
    }

    return (
        <div>
            <form className={'flex flex-col items-start p-6'} onSubmit={handleSubmit}>
                <div className={'flex flex-col mb-8 w-full'}>
                    <InputField label="일정 제목" placeholder="일정 제목을 입력해주세요" value={formData.name} name="name" onChange={handleChange} />
                </div>
                <div className="w-full mb-5">
                    <label className="block text-base font-medium mb-2">일정 시간</label>
                    <EventTimeSelector
                        isAllDay={formData.isAllDay}
                        toggleAllDay={() => setFormData({ ...formData, isAllDay: !formData.isAllDay })}
                        initStartDate={formData.startDate}
                        initEndDate={formData.endDate}
                        onStartDateChange={onStartDateTimeChange}
                        onEndDateChange={onEndDateTimeChange}
                    />
                </div>
                <div className={'flex flex-col mb-6 w-full'}>
                    <InputField
                        label="메모"
                        placeholder="일정에 대한 메모를 작성해주세요"
                        value={formData.description}
                        type="textarea"
                        rows={4}
                        name="description"
                        onChange={handleChange}
                    />
                </div>
                {!formData.eventId && (
                    <EventVenueSelector
                        initialPosition={{ lat: formData.location.coordinates[1], lng: formData.location.coordinates[0] }}
                        initialAddress={formData.address}
                        onPositionChange={onPositionChange}
                        onAddressChange={onAddressChange}
                    />
                )}
                <div className="w-full mt-10 flex flex-row justify-between gap-5 flex-center item-center">
                    <button type="submit" className="w-full bg-[#FF9575] text-white font-semibold p-2 rounded-lg hover:bg-[#FF7A58]">
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    )
}
