'use client'

import { Suspense, useEffect, useState } from 'react'
import PhotoUploader from '@/components/events/photoUploader'
import EventForm from '@/components/events/eventForm'
import { useSearchParams } from 'next/navigation'
import { ICategory } from '@fienmee/types'
import { eventStore } from '@/store'

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
    const { event, setEvent } = eventStore()

    const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const newPhotos = files.map(file => URL.createObjectURL(file))
        setEvent({ ...event, photo: [...event.photo, ...newPhotos] })
        e.target.value = ''
    }

    useEffect(() => {
        if (category) {
            const parsedCategory = JSON.parse(category)
            setSelectedCategories(prev => {
                const newSet = new Set(prev)
                if (![...newSet].some(cat => cat._id === parsedCategory._id)) {
                    newSet.add(parsedCategory)
                }
                return newSet
            })
        }
    }, [category])

    const handleRemovePhoto = (index: number) => {
        setEvent({ ...event, photo: event.photo.filter((_, i) => i !== index) })
    }

    return (
        <div className="min-h-screen flex flex-col px-4">
            <PhotoUploader photos={event.photo} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />
            <EventForm selectedCategories={selectedCategories} photos={event.photo} initEvent={event} isRegister={true} />
        </div>
    )
}
