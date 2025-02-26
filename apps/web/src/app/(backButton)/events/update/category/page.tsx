'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ICategory } from '@fienmee/types'
import { getEventsCategories } from '@/api/event'
import { eventStore } from '@/store'

const CategorySelect: React.FC = () => {
    const { event } = eventStore()
    const [categories, setCategories] = useState<ICategory[]>(event.category)
    const router = useRouter()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getEventsCategories()
                setCategories(data.categories)
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        }
        fetchCategories()
    }, [])

    const handleCategoryClick = (category: ICategory) => {
        router.push(`/events/update?category=${JSON.stringify(category)}`)
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">카테고리 선택</h1>
            <ul>
                {categories.map(category => (
                    <li key={category._id} className="p-2 border-b cursor-pointer hover:bg-gray-100" onClick={() => handleCategoryClick(category)}>
                        {category.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategorySelect
