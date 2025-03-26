import ScheduleItem from '@/components/schedules/scheduleItem'
import { IScheduleItem } from '@fienmee/types'

interface ScheduleListProp {
    selectedDate: Date
    items: IScheduleItem[]
}

export default function ScheduleList({ selectedDate, items }: ScheduleListProp) {
    const formatDate = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    return (
        <div>
            <div className="ml-5 mt-6 mb-3 text-xl font-bold text-left">{formatDate(selectedDate)} 일정</div>
            <div>{items && items.map((schedule: IScheduleItem) => <ScheduleItem key={schedule._id} {...schedule} />)}</div>
        </div>
    )
}
