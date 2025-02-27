interface ScheduleProp {
    time: string
    title: string
}

export default function ScheduleItem({ time, title }: ScheduleProp) {
    return (
        // todo: 클릭 시 일정 조회 상세 페이지로 이동
        <div className="grid grid-cols-5 divide-x-1">
            <div className="col-span-1 pr-4 m-4 border-r-2 border-r-gray-500">{time}</div>
            <div className="col-span-4 m-4">{title}</div>
        </div>
    )
}
