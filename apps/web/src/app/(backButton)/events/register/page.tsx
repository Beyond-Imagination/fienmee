'use client'

import { useState } from 'react'

import { ICategory } from '@fienmee/types'
import EventForm from '@/components/events/eventForm'
import { eventStore } from '@/store'

export default function RegisterPage() {
    const [selectedCategories, setSelectedCategories] = useState<Set<ICategory>>(new Set())
    const { event } = eventStore()

    return (
        <div className="grid items-center justify-items-center min-h-screen">
            <EventForm selectedCategories={selectedCategories} handleCategories={setSelectedCategories} initEvent={event} isRegister={true} />
        </div>
    )
}
