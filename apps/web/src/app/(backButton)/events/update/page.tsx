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
    const { event } = eventStore()
    const [photo, setPhoto] = useState<string[]>(event.photo)
    const [selectedCategories, setSelectedCategories] = useState<Set<ICategory>>(new Set(event.category ?? []))

    const handleAddPhoto = (photoUrls: string[]) => {
        setPhoto([...photo, ...photoUrls])
    }

    const handleRemovePhoto = (index: number) => {
        setPhoto(photo.filter((_, i) => i !== index))
    }

    return (
        <div className="grid items-center justify-items-center min-h-screen">
            <PhotoUploader photos={photo} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />
            <EventForm
                selectedCategories={selectedCategories}
                handleCategories={setSelectedCategories}
                photos={photo}
                initEvent={event}
                isRegister={false}
            />
        </div>
    )
}
