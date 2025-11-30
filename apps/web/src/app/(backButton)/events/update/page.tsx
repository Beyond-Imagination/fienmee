'use client'

import { Suspense, useState } from 'react'

import { ICategory } from '@fienmee/types'
import EventForm from '@/components/events/eventForm'
import { eventStore } from '@/store'
import { ClipLoader } from 'react-spinners'

export default function EventUpdate() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <ClipLoader color="#FF6B6B" size={50} />
                </div>
            }
        >
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
