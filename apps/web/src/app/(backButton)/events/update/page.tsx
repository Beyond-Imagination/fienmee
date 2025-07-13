'use client'

import { Suspense, useState } from 'react'

import { ICategory } from '@fienmee/types'
import EventForm from '@/components/events/eventForm'
import { eventStore } from '@/store'

export default function EventUpdate() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePageContent />
        </Suspense>
    )
}

function UpdatePageContent() {
    const { event } = eventStore()
    const [selectedCategories, setSelectedCategories] = useState<Set<ICategory>>(new Set(event.category ?? []))

    return (
        <div className="grid items-center justify-items-center min-h-screen">
            <EventForm selectedCategories={selectedCategories} handleCategories={setSelectedCategories} initEvent={event} isRegister={false} />
        </div>
    )
}
