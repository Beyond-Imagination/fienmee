'use client'

import SearchBar from '@/components/searchBar'
import PreviewEventLst from '@/components/events/previewEventList'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getEventsCategories } from '@/api/event'
import { useEffect, useState } from 'react'

export default function Home() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient) {
        return <PageComponent />
    }
}

function PageComponent() {
    const today = new Date()

    // TODO: remove get categories
    const { data } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: () => getEventsCategories(),
        refetchOnWindowFocus: false,
    })

    return (
        <div className="flex flex-col justify-items-center min-h-[80vh] my-6">
            <div className="px-8 mb-8">
                <SearchBar />
            </div>
            <div className="grid gap-10 w-full px-1">
                {/*TODO: change event category*/}
                <PreviewEventLst title={`${today.getDate()}일 일정`} category={data.categories[0]._id} />
                <div className="bg-[#F6F5F5] shadow-inner shadow-[#E4E4E4] w-full h-2" />
                <PreviewEventLst title="관심 카테고리" category={data.categories[0]._id} />
                <div className="bg-[#F6F5F5] shadow-inner shadow-[#E4E4E4] w-full h-2" />
                <PreviewEventLst title="인기 행사" category={data.categories[0]._id} />
            </div>
        </div>
    )
}
