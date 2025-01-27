import React, { useState } from 'react'

interface DateTimeInputProps {
    label: string
    onChange: (dateTime: string) => void
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ label, onChange }) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

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
                <input type="date" className="border rounded px-2 py-1" onChange={handleDateChange} />
                <input type="time" className="border rounded px-2 py-1" onChange={handleTimeChange} />
            </div>
        </div>
    )
}

export default DateTimeInput
