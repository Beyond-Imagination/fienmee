import Calendar from 'react-calendar'
import './calendar.css'
import { IScheduleItem } from '@fienmee/types'

interface ScheduleCalendarProps {
    onChange: (value: Date | null | [Date | null, Date | null]) => void
    handleMonthChanged: (data: { activeStartDate: Date | null }) => void
    schedulesOnMonth: IScheduleItem[]
}

interface ScheduleMonthChangedEvent {
    activeStartDate: Date | null
    view: 'century' | 'decade' | 'year' | 'month'
    action: 'prev' | 'prev2' | 'next' | 'next2' | 'onChange' | 'drillUp' | 'drillDown'
}

export default function ScheduleCalendar({ onChange, handleMonthChanged, schedulesOnMonth }: ScheduleCalendarProps) {
    const hasSchedule = (date: Date) => {
        const targetSchedules = schedulesOnMonth.filter((schedule: IScheduleItem) => {
            const startDate = new Date(schedule.startDate)
            const endDate = new Date(schedule.endDate)
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(0, 0, 0, 0)
            return startDate <= date && date <= endDate
        })
        return targetSchedules.length > 0
    }

    const handleOnActiveStartDateChange = async (e: ScheduleMonthChangedEvent) => {
        await handleMonthChanged(e)
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <Calendar
                locale="ko"
                onChange={onChange}
                onActiveStartDateChange={e => handleOnActiveStartDateChange(e)}
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
