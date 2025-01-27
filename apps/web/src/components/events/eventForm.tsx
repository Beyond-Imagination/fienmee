import React, { useState } from 'react'
import EventTimeSelector from '@/components/events/eventTimeSelector'
import InputField from '@/components/events/inputField'
import SubmitButton from './submitButton'
import EventVenueSelector from './eventVenueSelector'
import { registerEvent } from '@/api/event'
import { IEvent } from '@fienmee/types'

interface EventFormProps {
    isAllDay: boolean
    toggleAllDay: () => void
}

const EventForm: React.FC<EventFormProps> = ({ isAllDay, toggleAllDay }) => {
    const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 })
    const [formData, setFormData] = useState<IEvent>({
        _id: '',
        name: '',
        address: '',
        location: {
            type: 'Point',
            coordinates: [126.570667, 33.450701],
        },
        startDate: new Date(),
        endDate: new Date(),
        description: '',
        photo: [],
        cost: '',
        likeCount: 0,
        commentCount: 0,
        category: [],
        targetAudience: [],
        createdAt: new Date(),
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const onStartDateTimeChange = (dateTime: string) => {
        setFormData(prevState => ({ ...prevState, startDateTime: dateTime }))
    }

    const onEndDateTimeChange = (dateTime: string) => {
        setFormData(prevState => ({ ...prevState, endDateTime: dateTime }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
        try {
            await registerEvent({
                ...formData,
                location: {
                    type: 'Point',
                    coordinates: [position.lng, position.lat],
                },
            })
            alert('이벤트가 성공적으로 등록되었습니다.')
        } catch (error) {
            console.error('이벤트 등록 실패:', error)
            alert('이벤트 등록에 실패했습니다.')
        }
    }

    return (
        <form className="p-6 w-full max-w-lg mx-auto flex flex-col gap-6" onSubmit={handleSubmit}>
            <InputField label="행사 제목" placeholder="행사 제목을 입력해주세요" name="name" onChange={handleChange} />
            <EventTimeSelector
                isAllDay={isAllDay}
                toggleAllDay={toggleAllDay}
                onStartDateChange={onStartDateTimeChange}
                onEndDateChange={onEndDateTimeChange}
            />
            <div>
                <label>행사 장소</label>
                <EventVenueSelector initialPosition={position} onPositionChange={setPosition} />
            </div>
            <InputField label="이용 요금" placeholder="₩ 이용 요금을 입력해주세요" name="cost" onChange={handleChange} />
            <InputField
                label="설명"
                placeholder="행사에 대한 설명을 작성해주세요"
                type="textarea"
                rows={4}
                name="description"
                onChange={handleChange}
            />
            <SubmitButton label="등록하기" />
        </form>
    )
}

export default EventForm
