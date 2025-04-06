'use client'

import ScheduleList from '@/components/schedules/sheduleList'
import ScheduleCalendar from '@/components/schedules/scheduleCalendar'
import { useEffect, useState } from 'react'
import { ISchedules, IGetScheduleListResponse } from '@fienmee/types'
import { getSchedulesInMonth } from '@/api/schedules'
import { useQuery } from '@tanstack/react-query'

function convertDateToString(date: Date) {
    // date.getMonth()는 0부터 시작하는 month의 index를 반환한다.
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export default function Schedules() {
    const [selectedDay, setSelectedDay] = useState<string>(convertDateToString(new Date()))
    const [schedulesOnMonth, setSchedulesOnMonth] = useState<ISchedules>({})
    const [activeStartDate, setActiveStartDate] = useState<Date>(new Date(new Date().setDate(1))) // 현재날짜의 1일로 기본값 지정

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
        // react-calendar의 타입이 nullable, 명시적으로 Date 타입으로 캐스팅
        if (!activeStartDate) setActiveStartDate(activeStartDate as unknown as Date)
    }

    return (
        <div className="flex flex-col items-center">
            {isLoading && <div>Loading...</div>}
            {!isLoading && !isError && (
                <>
                    <ScheduleCalendar
                        onChange={newDate => setSelectedDay(convertDateToString(newDate as Date))}
                        handleMonthChanged={handleMonthChanged}
                        schedulesOnMonth={schedulesOnMonth}
                    />
                    <ScheduleList items={schedulesOnMonth?.[selectedDay]} selectedDate={selectedDay} />
                </>
            )}
        </div>
    )
}
