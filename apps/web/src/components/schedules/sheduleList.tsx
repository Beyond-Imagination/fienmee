import ScheduleItem from '@/components/schedules/scheduleItem'
import { IScheduleItem } from '@fienmee/types'

interface ScheduleListProp {
    selectedDate: string
    items: IScheduleItem[]
}

export default function ScheduleList({ selectedDate, items }: ScheduleListProp) {
    return (
        <div>
            <div className="ml-5 mt-6 mb-3 text-xl font-bold text-left">{selectedDate} 일정</div>
            <div>{items && items.map((schedule: IScheduleItem) => <ScheduleItem key={schedule._id} {...schedule} />)}</div>
        </div>
    )
}
