'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { getEventsCategories } from '@/api/event'

const CategorySelect: React.FC = () => {
    const router = useRouter()
    const { data } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: () => getEventsCategories(),
        refetchOnWindowFocus: false,
    })

    const handleCategoryClick = (categoryName: string) => {
        router.push(`/events/register?category=${categoryName}`)
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">카테고리 선택</h1>
            <ul>
                {data.categories.map(category => (
                    <li
                        key={category._id}
                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => handleCategoryClick(category.title)}
                    >
                        {category.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategorySelect
