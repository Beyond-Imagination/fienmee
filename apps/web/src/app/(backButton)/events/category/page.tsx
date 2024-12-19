'use client'

import { EventList } from '@/components/events/eventList'
import { categoryStore } from '@/store'

export default function Page() {
    const { category } = categoryStore()

    return (
        <div className="h-min-screen items-center justify-items-center min-h-screen bg-inherit overflow-hidden">
            {/*TODO: Remove temporary header*/}
            <div className="w-full h-full bg-inherit mt-24 overflow-y-auto">
                <EventList category={category} />
            </div>
        </div>
    )
}
