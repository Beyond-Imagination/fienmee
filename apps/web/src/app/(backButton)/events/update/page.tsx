'use client'

import { Suspense, useState } from 'react'

import { ICategory } from '@fienmee/types'
import PhotoUploader from '@/components/events/photoUploader'
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
    const { event, setEvent } = eventStore()
    const [selectedCategories, setSelectedCategories] = useState<Set<ICategory>>(new Set(event.category ?? []))

    const handleAddPhoto = (photoUrls: string[]) => {
        setEvent({ ...event, photo: [...event.photo, ...photoUrls] })
    }

    const handleRemovePhoto = (index: number) => {
        setEvent({ ...event, photo: event.photo.filter((_, i) => i !== index) })
    }

    return (
        <div className="grid items-center justify-items-center min-h-screen">
            <PhotoUploader photos={event.photo} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />
            <EventForm
                selectedCategories={selectedCategories}
                handleCategories={setSelectedCategories}
                photos={event.photo}
                initEvent={event}
                isRegister={false}
            />
        </div>
    )
}
