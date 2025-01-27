'use client'

import { useState } from 'react'
import PhotoUploader from '@/components/events/photoUploader'
import EventForm from '@/components/events/eventForm'

export default function RegisterPage() {
    const [isAllDay, setIsAllDay] = useState(false)
    const [photos, setPhotos] = useState<string[]>([])

    const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        const newPhotos = files.map(file => URL.createObjectURL(file))
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos])
        event.target.value = ''
    }

    const handleRemovePhoto = (index: number) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index))
    }

    return (
        <div className="min-h-screen flex flex-col px-4">
            <PhotoUploader photos={photos} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />
            <EventForm isAllDay={isAllDay} toggleAllDay={() => setIsAllDay(!isAllDay)} />
        </div>
    )
}
