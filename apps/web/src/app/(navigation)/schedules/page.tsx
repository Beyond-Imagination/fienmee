'use client'

import ScheduleList from '@/components/schedules/sheduleList'
import ScheduleCalendar from '@/components/schedules/scheduleCalendar'

export default function Schedules() {
    // todo: react-calendar 스타일링 및 상태관리
    const selectedDay: string = new Date().toDateString()
    return (
        <div className="flex flex-col items-center">
            <ScheduleCalendar />
            <ScheduleList date={selectedDay} />
        </div>
    )
}
