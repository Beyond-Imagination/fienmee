'use client'
import React, { useState } from 'react'
import { IMakeNewScheduleRequest } from '@fienmee/types'
import { registerSchedule } from '@/api/schedules'
import EventTimeSelector from '@/components/events/eventTimeSelector'
import { useRouter } from 'next/navigation'
import { eventStore } from '@/store'
import InputField from '@/components/events/inputField'

export default function ScheduleForm() {
    const router = useRouter()
    const { event } = eventStore()
    const [formData, setFormData] = useState<IMakeNewScheduleRequest>({
        name: event.name,
        eventId: event._id,
        isAllDay: event.isAllDay,
        startDate: event.startDate,
        endDate: event.endDate,
        description: '',
        location: event.location,
    })
    const onStartDateTimeChange = (dateTime: string) => {
        setFormData(prevState => ({ ...prevState, startDate: new Date(dateTime) }))
    }

    const onEndDateTimeChange = (dateTime: string) => {
        setFormData(prevState => ({ ...prevState, endDate: new Date(dateTime) }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // todo: add logic for validating and organizing request body object
        try {
            await registerSchedule(formData)
            alert('일정이 등록되었습니다.')
            router.push('/')
        } catch (error) {
            console.error('일정 등록 실패:', error)
            alert('일정 등록에 실패했습니다.')
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

                <div className="w-full mt-10 flex flex-row justify-between gap-5 flex-center item-center">
                    <button type="submit" className="w-full bg-[#FF9575] text-white font-semibold p-2 rounded-lg hover:bg-[#FF7A58]">
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    )
}
