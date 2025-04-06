import Calendar from 'react-calendar'
import './calendar.css'
import { ISchedules } from '@fienmee/types'
import { NextLabelIcon, PrevLabelIcon } from '@/components/icon/schedule'

interface ScheduleCalendarProps {
    onChange: (value: Date | null | [Date | null, Date | null]) => void
    handleMonthChanged: (data: { activeStartDate: Date | null }) => void
    schedulesOnMonth: ISchedules
}

interface ScheduleMonthChangedEvent {
    activeStartDate: Date | null
    view: 'century' | 'decade' | 'year' | 'month'
    action: 'prev' | 'prev2' | 'next' | 'next2' | 'onChange' | 'drillUp' | 'drillDown'
}

export default function ScheduleCalendar({ onChange, handleMonthChanged, schedulesOnMonth }: ScheduleCalendarProps) {
    const hasSchedule = (date: Date) => {
        return !schedulesOnMonth[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`]
    }

    const handleOnActiveStartDateChange = async (e: ScheduleMonthChangedEvent) => {
        await handleMonthChanged(e)
    }

    return (
        <div className="bg-white rounded-lg p-4 border-b border-b-[#E4E4E4]">
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
