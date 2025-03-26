interface ScheduleProp {
    startDate: Date
    name: string
}

export default function ScheduleItem({ startDate, name }: ScheduleProp) {
    const hours = String(startDate.getHours()).padStart(2, '0')
    const minutes = String(startDate.getMinutes()).padStart(2, '0')
    return (
        // todo: 클릭 시 일정 조회 상세 페이지로 이동
        <div className="grid grid-cols-5 divide-x-1">
            <div className="col-span-1 pr-4 m-4 border-r-2 border-r-gray-500">{`${hours}:${minutes}`}</div>
            <div className="col-span-4 m-4">{name}</div>
        </div>
    )
}
