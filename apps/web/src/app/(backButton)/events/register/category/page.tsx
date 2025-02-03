'use client'

import React, { useEffect, useState } from 'react'
import { getEventsCategories } from '../../../../../api/event'
import { useRouter } from 'next/navigation'

interface Category {
    id: string
    name: string
}

const CategorySelect: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getEventsCategories()
                const formattedCategories = data.categories.map((name, index) => ({
                    id: index.toString(),
                    name,
                }))
                setCategories(formattedCategories)
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        }
        fetchCategories()
    }, [])

    const handleCategoryClick = (categoryName: string) => {
        router.push(`/events/register?category=${categoryName}`)
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">카테고리 선택</h1>
            <ul>
                {categories.map(category => (
                    <li
                        key={category.id}
                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategorySelect
