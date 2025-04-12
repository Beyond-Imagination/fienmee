'use client'

import PhotoUploader from '@/components/events/photoUploader'
import EventForm from '@/components/events/eventForm'
import { Suspense, useEffect, useState } from 'react'
import { eventStore } from '@/store'
import { ICategory } from '@fienmee/types'
import { useSearchParams } from 'next/navigation'

export default function EventUpdate() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePageContent />
        </Suspense>
    )
}

function UpdatePageContent() {
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
    const { event, setEvent } = eventStore()
    const [selectedCategories, setSelectedCategories] = useState<Set<ICategory>>(new Set(event.category ?? []))

    const handleAddPhoto = (photoUrls: string[]) => {
        setEvent({ ...event, photo: [...event.photo, ...photoUrls] })
    }

    const handleRemovePhoto = (index: number) => {
        setEvent({ ...event, photo: event.photo.filter((_, i) => i !== index) })
    }

    useEffect(() => {
        if (!category) return
        try {
            const parsedCategory: ICategory = JSON.parse(category)
            setSelectedCategories(prev => {
                const updated = new Set(prev)
                if (![...updated].some(cat => cat._id === parsedCategory._id)) {
                    updated.add(parsedCategory)
                }
                return updated
            })
        } catch (error) {
            console.error('Invalid category query param:', error)
        }
    }, [category])

    return (
        <div className="grid items-center justify-items-center min-h-screen">
            <PhotoUploader photos={event.photo} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />
            <EventForm selectedCategories={selectedCategories} photos={event.photo} initEvent={event} isRegister={false} />
        </div>
    )
}
