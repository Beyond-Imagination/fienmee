'use client'

import PhotoUploader from '@/components/events/photoUploader'
import EventForm from '@/components/events/eventForm'
import { useEffect, useState } from 'react'
import { eventStore } from '@/store'

export default function EventUpdate() {
    const { event, setEvent } = eventStore()
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
    const [isAllDay, setIsAllDay] = useState(false)
    const category = event.category
    const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const newPhotos = files.map(file => URL.createObjectURL(file))
        setEvent({ ...event, photo: [...event.photo, ...newPhotos] })
        e.target.value = ''
    }

    useEffect(() => {
        if (category) {
            setSelectedCategories(prev => new Set([...prev, ...category]))
        }
    }, [category])

    const handleRemovePhoto = (index: number) => {
        setEvent({ ...event, photo: event.photo.filter((_, i) => i !== index) })
    }

    return (
        <div className="grid items-center justify-items-center min-h-screen">
            <PhotoUploader photos={event.photo} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />
            <EventForm
                isAllDay={isAllDay}
                toggleAllDay={() => setIsAllDay(!isAllDay)}
                selectedCategories={selectedCategories}
                photos={event.photo}
                initEvent={event}
            />
        </div>
    )
}
