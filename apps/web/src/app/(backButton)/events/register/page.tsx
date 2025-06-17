'use client'

import { useEffect, useState } from 'react'
import PhotoUploader from '@/components/events/photoUploader'
import EventForm from '@/components/events/eventForm'
import { useSearchParams } from 'next/navigation'
import { ICategory } from '@fienmee/types'
import { eventStore } from '@/store'

export default function RegisterPage() {
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
    const [selectedCategories, setSelectedCategories] = useState<Set<ICategory>>(new Set())
    const { event, setEvent } = eventStore()

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
            console.error('Invalid category data:', error)
        }
    }, [category])

    return (
        <div className="grid items-center justify-items-center min-h-screen">
            <PhotoUploader photos={event.photo ?? []} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />
            <EventForm selectedCategories={selectedCategories} photos={event.photo ?? []} initEvent={event} isRegister={true} />
        </div>
    )
}
