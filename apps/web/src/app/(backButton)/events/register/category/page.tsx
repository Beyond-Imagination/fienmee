'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ICategory } from '@fienmee/types'
import { getEventsCategories } from '@/api/event'
import CategoryError from '@/components/error/CategoryError'

const CategorySelect: React.FC = () => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [error, setError] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getEventsCategories()
                setCategories(data.categories)
            } catch (error) {
                console.error('Failed to fetch categories:', error)
                setError(true)
            }
        }
        fetchCategories()
    }, [])

    const handleCategoryClick = (category: ICategory) => {
        router.push(`/events/register?category=${JSON.stringify(category)}`)
    }

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4">카테고리 선택</h1>
            {error ? (
                <CategoryError />
            ) : (
                <ul className="w-full">
                    {categories.map(category => (
                        <li
                            key={category._id}
                            className="p-2 border-b cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CategorySelect
