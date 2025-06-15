import { format } from 'date-fns'

interface ScheduleProp {
    startDate: Date
    endDate: Date
    title: string
    onClick?: () => void
}

export default function ScheduleItem({ startDate, endDate, title, onClick }: ScheduleProp) {
    const formatTime = (date: Date) => {
        return format(date, 'MM.dd HH:mm a')
    }
    return (
        <div className="flex flex-col" onClick={onClick}>
            <div className="text-lg text-[#1B1B1B] p-4 pb-1">{title}</div>
            <div className="text-base text-[#B8BABB] px-4 pb-1">{`${formatTime(startDate)} - ${formatTime(endDate)}`}</div>
        </div>
    )
}
