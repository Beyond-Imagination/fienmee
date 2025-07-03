import { IEvent } from '@fienmee/types'
import Link from 'next/link'
import { eventStore } from '@/store/event'
import { titleStore } from '@/store'

interface Props {
    event: IEvent | undefined
}

const formatDate = (date: Date) => {
    const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
    return formattedDate.replace(/\s/g, '').replace(/\.$/, '')
}

export default function Event({ event }: Props) {
    if (!event) {
        return (
            <div className="flex justify-between gap-4 mx-4 pb-2 animate-pulse">
                <div className="flex flex-col min-h-32 w-2/3 ps-2">
                    <div className="w-full h-6 bg-[#D9D9D9] my-2 rounded" />
                    <div className="w-5/6 h-3 bg-[#D9D9D9] my-2 rounded" />
                    <div className="w-2/3 h-3 bg-[#D9D9D9] my-2 rounded" />
                </div>
                <div className="flex-1 h-32 bg-[#D9D9D9] overflow-hidden mt-1 me-2 rounded" />
            </div>
        )
    }

    const { setEvent } = eventStore()
    const { setTitle } = titleStore()
    const onClick = () => {
        setEvent(event)
        setTitle('')
    }

    return (
        <Link
            href={`/events/detail`}
            onClick={onClick}
            className="flex hover:bg-gray-100 transition duration-300 justify-between items-start gap-4 mx-4 pb-2"
        >
            <div className="flex flex-col min-h-32 w-2/3 ps-2">
                <div className="text-lg font-semibold">{event.name}</div>
                <div className="text-base text-gray-600">{`${formatDate(event.startDate)}~${formatDate(event.endDate)}`}</div>
                <div className="text-base text-gray-600">{event.address}</div>
            </div>
            <div className="flex-1 bg-[#D9D9D9] overflow-hidden mt-1 me-2 rounded">
                {/*TODO: change image tag*/}
                <img src={event.photo[0]} alt="대표 사진" className="w-full h-full object-cover object-top" />
            </div>
        </Link>
    )
}
