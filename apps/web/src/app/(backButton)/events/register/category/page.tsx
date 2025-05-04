'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ICategory } from '@fienmee/types'
import { getEventsCategories } from '@/api/event'

const CategorySelect: React.FC = () => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getEventsCategories()
                if (!data || !data.categories) {
                    throw new Error('카테고리 데이터가 없습니다.')
                }
                setCategories(data.categories)
            } catch (error) {
                console.error('카테고리 불러오기 실패:', error)
                throw error // `error.tsx` 자동 실행
            }
        }
        fetchCategories()
    }, [])

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4">카테고리 선택</h1>
            <ul className="w-full">
                {categories.map(category => (
                    <li
                        key={category._id}
                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => router.push(`/events/register?category=${JSON.stringify(category)}`)}
                    >
                        {category.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategorySelect
