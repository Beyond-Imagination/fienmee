import React from 'react'
import DateTimeInput from './dateTimeInput'

interface EventTimeSelectorProps {
    isAllDay: boolean
    toggleAllDay: () => void
    initStartDate: Date
    initEndDate: Date
    onStartDateChange: (date: string) => void
    onEndDateChange: (date: string) => void
}

const EventTimeSelector: React.FC<EventTimeSelectorProps> = ({
    isAllDay,
    toggleAllDay,
    initStartDate,
    initEndDate,
    onStartDateChange,
    onEndDateChange,
}) => {
    return (
        <div>
            <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-700 font-medium">하루 종일</span>
                    <button
                        type="button"
                        className={`w-11 h-5 flex items-center rounded-full p-1 ${isAllDay ? 'bg-black' : 'bg-gray-300'}`}
                        onClick={toggleAllDay}
                    >
                        <div className={`h-4 w-4 rounded-full bg-white transform transition-transform ${isAllDay ? 'translate-x-5' : ''}`} />
                    </button>
                </div>
                <hr className="border-gray-300 mb-4" />

                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium w-[50px]">시작</label>
                        <DateTimeInput value={initStartDate} onChange={onStartDateChange} hideTime={isAllDay} />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium w-[50px]">종료</label>
                        <DateTimeInput value={initEndDate} onChange={onEndDateChange} hideTime={isAllDay} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventTimeSelector
