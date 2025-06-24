'use client'

import { useState } from 'react'

import { ICategory } from '@fienmee/types'
import PhotoUploader from '@/components/events/photoUploader'
import EventForm from '@/components/events/eventForm'
import { eventStore } from '@/store'

export default function RegisterPage() {
    const [selectedCategories, setSelectedCategories] = useState<Set<ICategory>>(new Set())
    const { event, setEvent } = eventStore()

    const handleAddPhoto = (photoUrls: string[]) => {
        setEvent({ ...event, photo: [...event.photo, ...photoUrls] })
    }

    const handleRemovePhoto = (index: number) => {
        setEvent({ ...event, photo: event.photo.filter((_, i) => i !== index) })
    }

    return (
        <div className="grid items-center justify-items-center min-h-screen">
            <PhotoUploader photos={event.photo ?? []} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />
            <EventForm
                selectedCategories={selectedCategories}
                handleCategories={setSelectedCategories}
                photos={event.photo ?? []}
                initEvent={event}
                isRegister={true}
            />
        </div>
    )
}
