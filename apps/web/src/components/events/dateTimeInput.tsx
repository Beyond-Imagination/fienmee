import React, { useState } from 'react'

interface DateTimeInputProps {
    value: Date
    onChange: (dateTime: string) => void
    hideTime?: boolean
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ value, onChange, hideTime }) => {
    const [date, setDate] = useState(new Date(value).toISOString().split('T')[0])
    const [time, setTime] = useState(new Date(value).toTimeString().slice(0, 5))

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value
        setDate(newDate)
        onChange(`${newDate}T${time}`)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value
        setTime(newTime)
        onChange(`${date}T${newTime}`)
    }

    return (
        <div className="flex items-center gap-2">
            <input type="date" value={date} className="border rounded px-2 py-1 w-auto min-w-[120px] text-right" onChange={handleDateChange} />
            {!hideTime && <input type="time" value={time} className="border rounded px-2 py-1 w-[105px] text-right" onChange={handleTimeChange} />}
        </div>
    )
}

export default DateTimeInput
