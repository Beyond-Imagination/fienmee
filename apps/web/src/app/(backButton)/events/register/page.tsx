'use client'

import { Suspense, useEffect, useState } from 'react'
import PhotoUploader from '@/components/events/photoUploader'
import EventForm from '@/components/events/eventForm'
import { useSearchParams } from 'next/navigation'
import { ICategory } from '@fienmee/types'

export default function RegisterPage() {
    return (
        /* TODO: Create a custom loading screen */
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterPageContent />
        </Suspense>
    )
}

function RegisterPageContent() {
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
    const [selectedCategories, setSelectedCategories] = useState<Set<ICategory>>(new Set())
    const [isAllDay, setIsAllDay] = useState(false)
    const [photos, setPhotos] = useState<string[]>([])

    const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        const newPhotos = files.map(file => URL.createObjectURL(file))
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos])
        event.target.value = ''
    }

    useEffect(() => {
        if (category) {
            setSelectedCategories(prev => new Set(prev).add(JSON.parse(category)))
        }
    }, [category])

    const handleRemovePhoto = (index: number) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index))
    }

    return (
        <div className="min-h-screen flex flex-col px-4">
            <PhotoUploader photos={photos} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />
            <EventForm isAllDay={isAllDay} toggleAllDay={() => setIsAllDay(!isAllDay)} selectedCategories={selectedCategories} photos={photos} />
        </div>
    )
}
