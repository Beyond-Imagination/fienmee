import Calendar from 'react-calendar'
import './calendar.css'
import { CalendarDateRange } from '@fienmee/types'

interface ScheduleCalendarProps {
    onChange: (value: Date) => void
}

export default function ScheduleCalendar({ onChange }: ScheduleCalendarProps) {
    const handleChange = (value: CalendarDateRange) => {
        onChange(value as Date)
    }

    const hasSchedule = (date: Date) => {
        // todo: 월별 일정을 가져오는 api 연동
        return date.getTime() % 100 < 50
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <Calendar
                onChange={handleChange}
                calendarType="gregory"
                formatMonthYear={(locale, date) => {
                    const year = date.getFullYear()
                    const month = date.getMonth() + 1
                    return `${year}년 ${month}월`
                }}
                formatDay={(locale, date) => {
                    return date.getDate().toString()
                }}
                formatShortWeekday={(locale, date) => {
                    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                    return weekdays[date.getDay()]
                }}
                prev2Label={null}
                next2Label={null}
                showNeighboringMonth={false}
                tileClassName={({ date, view }) => {
                    if (view === 'month' && hasSchedule(date)) {
                        return 'has-schedules'
                    }
                }}
            />
        </div>
    )
}
