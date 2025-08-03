import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface ScheduleProp {
    startDate: Date
    endDate: Date
    title: string
    isAllDay: boolean
    onClick?: () => void
}

export default function ScheduleItem({ startDate, endDate, title, isAllDay, onClick }: ScheduleProp) {
    const formatTime = (date: Date) => {
        return format(date, 'MM.dd a h:mm', { locale: ko })
    }
    return (
        <div className="flex flex-col" onClick={onClick}>
            <div className="text-lg text-[#1B1B1B] p-4 pb-1">{title}</div>
            <div className="text-base text-[#B8BABB] px-4 pb-1">{isAllDay ? '하루 종일' : `${formatTime(startDate)} - ${formatTime(endDate)}`}</div>
        </div>
    )
}
