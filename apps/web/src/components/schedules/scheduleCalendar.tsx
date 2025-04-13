import Calendar from 'react-calendar'
import './calendar.css'
import { CalendarDateRange } from '@fienmee/types'
import { NextLabelIcon, PrevLabelIcon } from '@/components/icon/schedule'

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
        <div className="bg-white rounded-lg p-4 border-b border-b-[#E4E4E4]">
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
                prevLabel={PrevLabelIcon({ width: '0.5rem', height: '0.75rem' })}
                prev2Label={null}
                nextLabel={NextLabelIcon({ width: '0.5rem', height: '0.75rem' })}
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
