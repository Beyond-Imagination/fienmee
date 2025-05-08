'use client'

import { useQuery } from '@tanstack/react-query'
import { IGetEventsByCategoryResponse } from '@fienmee/types'
import { getEventsByCategory } from '@/api/event'
import Event from '@/components/events/event'

interface Props {
    title: string
    category: string
}

export default function PreviewEventLst({ title, category }: Props) {
    const { data, isLoading, isError } = useQuery<IGetEventsByCategoryResponse>({
        queryKey: ['events', category],
        queryFn: () => getEventsByCategory(category, 1, 3),
    })

    if (isLoading) {
        return (
            <div className="h-full w-full">
                <div className="h-full w-full px-2 mt-4">
                    {Array.from({ length: 3 }, (_, index) => (
                        <Event event={undefined} key={index} />
                    ))}
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="h-screen flex items-center justify-center px-4">
                <div className="text-lg text-center">
                    행사를 불러오는 데 실패하였습니다.
                    <br />
                    다시 시도해 주시길 바랍니다.
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-start gap-4">
            <span className="inline-block text-2xl text-[#FF9575] font-bold border-b-[1.5px] border-b-[#FF9575] ms-4">{title}</span>
            <div className="flex flex-col w-full gap-8">
                {/*TODO: change event list for preview list*/}
                {data && data.events.map(event => <Event event={event} key={event._id} />)}
            </div>
        </div>
    )
}
