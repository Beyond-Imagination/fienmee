import React from 'react'

interface DateTimeInputProps {
    label: string
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ label }) => {
    return (
        <div className="flex justify-between items-center gap-2">
            <label className="text-sm text-gray-700">{label}</label>
            <div className="flex gap-2">
                <input type="date" className="border rounded px-2 py-1" />
                <input type="time" className="border rounded px-2 py-1" />
            </div>
        </div>
    )
}

export default DateTimeInput
