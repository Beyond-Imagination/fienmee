import Calendar from 'react-calendar'
import './calendar.css'
import { useState } from 'react'
export default function ScheduleCalendar() {
    const [date, setDate] = useState(new Date())

    const onChange = newDate => {
        setDate(newDate)
    }
    return (
        <div>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <Calendar
                    onChange={onChange}
                    value={date}
                    local="ko-KR"
                    formatMonthYear={(locale, date) => {
                        const year = date.getFullYear()
                        const month = date.getMonth()
                        return `${year}년 ${month}월`
                    }}
                    formatShortWeekday={(locale, date) => {
                        const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                        return weekdays[date.getDay()]
                    }}
                    className="border-none"
                    maxDate={new Date()}
                />
            </div>
        </div>
    )
}
