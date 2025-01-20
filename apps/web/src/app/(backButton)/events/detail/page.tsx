'use client'

import { eventStore } from '@/store'
import EventDetail from '@/components/events/eventDetail'
export default function Page() {
    const { event } = eventStore()

    return <EventDetail event={event} />
}
