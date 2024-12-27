'use client'

import { EventList } from '@/components/events/eventList'
import { titleStore } from '@/store'

export default function Page() {
    const { title } = titleStore()
    if (!title) {
        return (
            <div className="h-screen flex items-center justify-center px-4">
                <div className="text-lg text-center">잘못된 접근입니다.</div>
            </div>
        )
    }

    return (
        <div className="h-min-screen items-center justify-items-center min-h-screen bg-inherit">
            <div className="w-full h-full bg-inherit">
                <EventList category={title} />
            </div>
        </div>
    )
}
