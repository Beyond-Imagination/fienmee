'use client'

import ScheduleList from '@/components/schedules/sheduleList'
import ScheduleCalendar from '@/components/schedules/scheduleCalendar'
import { useState } from 'react'

export default function Schedules() {
    const [selectedDay, setSelectedDay] = useState<Date>(new Date())
    return (
        <div className="flex flex-col items-center">
            <ScheduleCalendar onChange={newDate => setSelectedDay(newDate as Date)} />
            <ScheduleList date={selectedDay as Date} />
        </div>
    )
}
