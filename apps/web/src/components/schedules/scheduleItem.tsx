interface ScheduleProp {
    time: string
    title: string
    onClick?: () => void
}

export default function ScheduleItem({ time, title, onClick }: ScheduleProp) {
    return (
        <div className="grid grid-cols-5 divide-x-1" onClick={onClick}>
            <div className="col-span-1 pr-4 m-4 border-r-2 border-r-gray-500">{time}</div>
            <div className="col-span-4 m-4">{title}</div>
        </div>
    )
}
