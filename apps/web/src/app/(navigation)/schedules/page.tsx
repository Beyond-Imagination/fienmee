'use client'

import ScheduleList from '@/components/schedules/sheduleList'
import ScheduleCalendar from '@/components/schedules/scheduleCalendar'
import { useState } from 'react'
import { IScheduleItem } from '@fienmee/types'

export default function Schedules() {
    const [selectedDay, setSelectedDay] = useState<Date>(new Date())
    const [schedulesOnMonth, setSchedulesOnMonth] = useState<IScheduleItem[]>([])

    const handleMonthChanged = ({ activeStartDate }: { activeStartDate: Date }) => {
        const month = activeStartDate.getMonth() + 1 // month는 0부터 시작
        const year = activeStartDate.getFullYear()
        alert(`month: ${month}, year: ${year}`)
        // todo: fetch month data and initialize testMonthData
        const data: IScheduleItem[] = [
            {
                _id: '65a1b2c3d4e5f6a7b8c9d0e2',
                eventId: 'event-67890',
                name: 'Music Festival 2023',
                startDate: new Date('2025-02-01T12:00:00Z'),
                images: ['https://example.com/images/music-fest-1.jpg', 'https://example.com/images/music-fest-2.jpg'],
            },
        ]
        setSchedulesOnMonth(data)
    }

    return (
        <div className="flex flex-col items-center">
            <ScheduleCalendar
                onChange={newDate => setSelectedDay(newDate as Date)}
                handleMonthChanged={handleMonthChanged}
                schedulesOnMonth={schedulesOnMonth}
            />
            {/*todo: 일별로 data fetch를 하는 방식에서, month-data를 기반으로 특정 일자에 해당하는 데이터만 전달*/}
            <ScheduleList date={selectedDay as Date} />
        </div>
    )
}
