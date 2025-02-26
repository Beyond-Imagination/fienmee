'use client'

import PhotoUploader from '@/components/events/photoUploader'
import EventForm from '@/components/events/eventForm'
import { useEffect, useState } from 'react'
import { eventStore } from '@/store'
import { ICategory } from '@fienmee/types'
import { useSearchParams } from 'next/navigation'

export default function EventUpdate() {
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
    const { event, setEvent } = eventStore()
    const [selectedCategories, setSelectedCategories] = useState<Set<ICategory>>(new Set(event.category))
    const [isAllDay, setIsAllDay] = useState(false)
    const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const newPhotos = files.map(file => URL.createObjectURL(file))
        setEvent({ ...event, photo: [...event.photo, ...newPhotos] })
        e.target.value = ''
    }

    useEffect(() => {
        if (category) {
            const parsedCategory = JSON.parse(category)
            setSelectedCategories(new Set([parsedCategory]))
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
