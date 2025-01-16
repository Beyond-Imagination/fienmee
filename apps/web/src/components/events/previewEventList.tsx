import { EventList } from '@/components/events/eventList'

interface Props {
    header: string
    category: string
}

export default function PreviewEventLst({ header, category }: Props) {
    return (
        <div className="flex flex-col items-start gap-4">
            <span className="inline-block text-2xl text-[#FF9575] font-bold border-b-[1.5px] border-b-[#FF9575] ms-4">{header}</span>
            <div className="w-full max-h-[55vh] overflow-y-auto">
                {/*TODO: change event list for preview list*/}
                <EventList category={category} />
            </div>
        </div>
    )
}
