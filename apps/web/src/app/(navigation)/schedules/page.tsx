'use client'

import ScheduleList from '@/components/schedules/scheduleList'
import ScheduleCalendar from '@/components/schedules/scheduleCalendar'
import { useState } from 'react'

export default function Schedules() {
    const [selectedDay, setSelectedDay] = useState<Date>(new Date())
    return (
        <div className="flex flex-col items-center gap-2 bg-[#F6F5F5]">
            <ScheduleCalendar setSelectedDay={setSelectedDay} />
            <ScheduleList date={selectedDay} />
        </div>
    )
}
