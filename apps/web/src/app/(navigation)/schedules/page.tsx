'use client'

import ScheduleList from '@/components/schedules/sheduleList'
import ScheduleCalendar from '@/components/schedules/scheduleCalendar'
import { useEffect, useState } from 'react'
import { IScheduleItem, IGetScheduleListResponse } from '@fienmee/types'
import { getSchedulesInMonth } from '@/api/schedules'
import { useQuery } from '@tanstack/react-query'

export default function Schedules() {
    const [selectedDay, setSelectedDay] = useState<Date>(new Date())
    const [schedulesOnMonth, setSchedulesOnMonth] = useState<IScheduleItem[]>([])
    const [activeStartDate, setActiveStartDate] = useState<Date | null>(null)

    const useGetSchedulesInMonthQuery = ({ year, month }: { year: number; month: number }) => {
        const { data, isLoading, isError } = useQuery<IGetScheduleListResponse>({
            queryKey: ['schedules', year, month],
            queryFn: () => getSchedulesInMonth(year, month),
        })
        return { data, isLoading, isError }
    }

    const year = activeStartDate ? activeStartDate.getFullYear() : new Date().getFullYear()
    const month = activeStartDate ? activeStartDate.getMonth() + 1 : new Date().getMonth() + 1
    const { data, isLoading, isError } = useGetSchedulesInMonthQuery({ year, month })
    useEffect(() => {
        if (!isLoading && !isError && data) {
            setSchedulesOnMonth(data.schedules)
        }
    }, [data])

    const handleMonthChanged = async ({ activeStartDate }: { activeStartDate: Date | null }) => {
        if (!activeStartDate) setActiveStartDate(activeStartDate)
    }

    return (
        <div className="flex flex-col items-center">
            {isLoading && <div>Loading...</div>}
            {!isLoading && !isError && (
                <>
                    <ScheduleCalendar
                        onChange={newDate => setSelectedDay(newDate as Date)}
                        handleMonthChanged={handleMonthChanged}
                        schedulesOnMonth={schedulesOnMonth}
                    />
                    <ScheduleList
                        items={schedulesOnMonth?.filter(schedule => schedule.startDate <= selectedDay && schedule.endDate >= selectedDay)}
                        selectedDate={selectedDay}
                    />
                </>
            )}
        </div>
    )
}
