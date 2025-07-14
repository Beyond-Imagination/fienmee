'use client'

import { EventList } from '@/components/events/eventList'
import { categoryStore } from '@/store'

export default function Page() {
    const { category } = categoryStore()
    if (category._id === '') {
        return (
            <div className="h-screen flex items-center justify-center px-4">
                <div className="text-lg text-center">잘못된 접근입니다.</div>
            </div>
        )
    }

    return (
        <div className="items-center justify-items-center bg-inherit">
            <div className="w-full h-full bg-inherit">
                <EventList category={category._id.toString()} />
            </div>
        </div>
    )
}
