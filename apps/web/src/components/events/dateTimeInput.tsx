import React, { useState } from 'react'

interface DateTimeInputProps {
    label: string
    value: Date
    onChange: (dateTime: string) => void
    hideTime?: boolean
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ label, value, onChange, hideTime }) => {
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
        <div className="flex justify-between items-center gap-2">
            <label className="text-sm text-gray-700">{label}</label>
            <div className="flex gap-2">
                <input type="date" value={date} className="border rounded px-2 py-1" onChange={handleDateChange} />
                {!hideTime && <input type="time" value={time} className="border rounded px-2 py-1" onChange={handleTimeChange} />}
            </div>
        </div>
    )
}

export default DateTimeInput
