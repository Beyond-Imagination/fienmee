'use client'

import ScheduleList from '@/components/schedules/sheduleList'
import ScheduleCalendar from '@/components/schedules/scheduleCalendar'

export default function Schedules() {
    const selectedDay: string = new Date().toDateString()
    return (
        <div className="flex flex-col items-center">
            <ScheduleCalendar />
            <ScheduleList date={selectedDay} />
        </div>
    )
}
