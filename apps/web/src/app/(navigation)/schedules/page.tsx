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

    const useGetSchedulesInMonthQuery = ({ year, month }: { year: number | null; month: number | null }) => {
        const { data } = useQuery<IGetScheduleListResponse>({
            queryKey: ['schedules', year, month],
            queryFn: () => {
                if (!year && !month) return getSchedulesInMonth(year as number, month as number)
                return Promise.reject(new Error('Invalid selectedDay'))
            },
        })
        return { fetchedSchedule: data?.schedules }
    }

    const year = activeStartDate ? activeStartDate.getFullYear() : null
    const month = activeStartDate ? activeStartDate.getMonth() : null
    const { fetchedSchedule } = useGetSchedulesInMonthQuery({ year, month: month ? month + 1 : null }) // month는 1부터 시작

    useEffect(() => {
        if (fetchedSchedule) {
            setSchedulesOnMonth(fetchedSchedule)
        }
    }, [fetchedSchedule])

    const handleMonthChanged = async ({ activeStartDate }: { activeStartDate: Date | null }) => {
        if (!activeStartDate) setActiveStartDate(activeStartDate)
    }

    return (
        <div className="flex flex-col items-center">
            <ScheduleCalendar
                onChange={newDate => setSelectedDay(newDate as Date)}
                handleMonthChanged={handleMonthChanged}
                schedulesOnMonth={schedulesOnMonth}
            />
            <ScheduleList
                items={schedulesOnMonth.filter(schedule => schedule.startDate <= selectedDay && schedule.endDate >= selectedDay)}
                selectedDate={selectedDay}
            />
        </div>
    )
}
