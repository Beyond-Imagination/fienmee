'use client'

import ScheduleList from '@/components/schedules/sheduleList'
import ScheduleCalendar from '@/components/schedules/scheduleCalendar'
import { useState } from 'react'
import { IScheduleItem, IGetScheduleListResponse } from '@fienmee/types'
import { getSchedulesInMonth } from '@/api/schedules'

export default function Schedules() {
    const [selectedDay, setSelectedDay] = useState<Date>(new Date())
    const [schedulesOnMonth, setSchedulesOnMonth] = useState<IScheduleItem[]>([])

    const handleMonthChanged = async ({ activeStartDate }: { activeStartDate: Date | null }) => {
        if (!activeStartDate) return // 사용자 시나리오에서는 activeStartDate가 null일 수 없음. 타입 호환성을 위한 null 타이핑
        const month = activeStartDate.getMonth() + 1 // month는 0부터 시작
        const year = activeStartDate.getFullYear()
        const response: IGetScheduleListResponse = await getSchedulesInMonth(year, month)
        setSchedulesOnMonth(response.schedules)
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
