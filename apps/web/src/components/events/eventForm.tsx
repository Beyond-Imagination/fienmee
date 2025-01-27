import React, { useState } from 'react'
import EventTimeSelector from '@/components/events/eventTimeSelector'
import InputField from '@/components/events/inputField'
import SubmitButton from './submitButton'
import EventVenueSelector from './eventVenueSelector'

interface EventFormProps {
    isAllDay: boolean
    toggleAllDay: () => void
}

const EventForm: React.FC<EventFormProps> = ({ isAllDay, toggleAllDay }) => {
    const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 })

    return (
        <form className="p-6 w-full max-w-lg mx-auto flex flex-col gap-6 ">
            <InputField label="행사 제목" placeholder="행사 제목을 입력해주세요" />
            <EventTimeSelector isAllDay={isAllDay} toggleAllDay={toggleAllDay} />
            <div>
                <label>행사 장소</label>
                <EventVenueSelector initialPosition={position} onPositionChange={setPosition} />
            </div>
            <InputField label="이용 요금" placeholder="₩ 이용 요금을 입력해주세요" />
            <InputField label="설명" placeholder="행사에 대한 설명을 작성해주세요" type="textarea" rows={4} />
            <SubmitButton label="등록하기" />
        </form>
    )
}

export default EventForm
