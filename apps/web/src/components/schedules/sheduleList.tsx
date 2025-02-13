import ScheduleItem from '@/components/schedules/scheduleItem'

interface Prop {
    date: Date
}
export default function ScheduleList({ date }: Prop) {
    const formatDate = date => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}.${month}.${day}`
    }
    const data = [
        { id: 1, time: '18:00', title: '삼성동 봉은사 축제' },
        { id: 2, time: '20:00', title: '플리마켓' },
    ]
    return (
        <div>
            <div className="ml-5 mt-6 mb-3 text-xl font-bold">{formatDate(date)} 일정</div>
            <div>{data && data.map(item => <ScheduleItem key={item.id} {...item} />)}</div>
        </div>
    )
}
