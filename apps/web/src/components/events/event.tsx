import { IEvent } from '@fienmee/types'
import Link from 'next/link'
import { eventStore } from '@/store/event'

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
            <div className="flex justify-between gap-4 px-4 my-6 animate-pulse">
                <div className="flex flex-col w-2/3 ps-2 gap-2">
                    <div className="w-4/5 h-6 bg-[#D9D9D9] my-2" />
                    <div className="w-3/4 h-3 bg-[#D9D9D9] my-2" />
                    <div className="w-2/3 h-3 bg-[#D9D9D9] my-2" />
                </div>
                <div className="flex justify-center items-center w-28 h-28 bg-[#D9D9D9] overflow-hidden me-2" />
            </div>
        )
    }

    const { setEvent } = eventStore()

    return (
        <Link
            href={`/events/detail`}
            onClick={() => setEvent(event)}
            className="block hover:bg-gray-100 transition duration-300 flex justify-between items-start gap-4 px-4 mb-12"
        >
            <div className="flex flex-col w-2/3 ps-2 pt-2 gap-2">
                <div className="text-xl font-semibold">{event.name}</div>
                <div className="text-lg text-gray-600">{`${formatDate(event.startDate)}~${formatDate(event.endDate)}`}</div>
                <div className="text-lg text-gray-600">{event.address}</div>
            </div>
            <div className="flex justify-center items-center w-28 bg-[#D9D9D9] overflow-hidden me-2">
                {/*TODO: change image tag*/}
                <img src={event.photo[0]} alt="대표 사진" className="w-full h-full object-cover" />
            </div>
        </Link>
    )
}
