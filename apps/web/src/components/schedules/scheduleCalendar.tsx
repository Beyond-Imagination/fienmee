import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import './calendar.css'

import { CalendarDateRange, IGetDailyScheduleCountResponse } from '@fienmee/types'
import { NextLabelIcon, PrevLabelIcon } from '@/components/icon/schedule'
import { useQuery } from '@tanstack/react-query'
import { getDailyScheduleCount } from '@/api/schedules'
import { format } from 'date-fns'

interface ScheduleCalendarProps {
    setSelectedDay: Dispatch<SetStateAction<Date>>
}

export default function ScheduleCalendar({ setSelectedDay }: ScheduleCalendarProps) {
    const [currentDay, setCurrentDay] = useState<Date>(new Date())

    useEffect(() => {}, [currentDay])

    const { data } = useQuery<IGetDailyScheduleCountResponse>({
        queryKey: ['monthlySchedule', currentDay.getFullYear(), currentDay.getMonth()],
        queryFn: async () => {
            const from = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1)
            const to = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1)
            return await getDailyScheduleCount(from, to)
        },
    })

    const handleChange = (value: CalendarDateRange) => {
        const currentDay = value as Date
        setSelectedDay(currentDay)
        setCurrentDay(currentDay)
    }

    const hasSchedule = (date: Date): boolean => {
        const key = format(date, 'yyyy-MM-dd')
        return (data && data[key] !== 0) || false
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
