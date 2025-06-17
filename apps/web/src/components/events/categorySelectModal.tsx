import React, { useEffect, useState } from 'react'

import { ICategory } from '@fienmee/types'
import { getEventsCategories } from '@/api/event'
import { FullScreenDialog } from '@/components/modal'

interface Props {
    selectedCategories: Set<ICategory>
    handleCategories: (categories: Set<ICategory>) => void
    isOpen: boolean
    onClose: () => void
}

export function CategorySelectModal({ selectedCategories, handleCategories, isOpen, onClose }: Props) {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [selected, setSelected] = useState<Set<ICategory>>(selectedCategories)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getEventsCategories()
                if (!data || !data.categories) {
                    throw new Error('카테고리 데이터가 없습니다.')
                }
                setCategories([...data.favoriteCategories, ...data.categories])
            } catch (error) {
                console.error('카테고리 불러오기 실패:', error)
                throw error // `error.tsx` 자동 실행
            }
        }
        fetchCategories()
    }, [])

    const handleCategory = (category: ICategory, exists: boolean) => {
        setSelected(prev => {
            const updated = new Set(prev)
            if (exists) {
                for (const cat of updated) {
                    if (cat._id === category._id) {
                        updated.delete(cat)
                        break
                    }
                }
            } else {
                updated.add(category)
            }
            return updated
        })
    }

    return (
        <FullScreenDialog isOpen={isOpen} hasClose={true} onClose={onClose}>
            <div className="flex flex-col h-full p-2 gap-4">
                <h1 className="text-xl font-bold">카테고리 선택</h1>
                <ul className="h-[75%] w-full overflow-y-auto">
                    {categories.map(category => {
                        const exists = [...selected].some(cat => cat._id === category._id)
                        return (
                            <li
                                key={category._id}
                                className={`p-2 border-b cursor-pointer ${exists ? 'bg-[#FF9575] text-white' : ''}`}
                                onClick={() => handleCategory(category, exists)}
                            >
                                {category.title}
                            </li>
                        )
                    })}
                </ul>
                <button
                    className="w-full bg-[#FF9575] text-white py-3 text-center font-semibold rounded-lg"
                    onClick={() => {
                        handleCategories(selected)
                        onClose()
                    }}
                >
                    선택하기
                </button>
            </div>
        </FullScreenDialog>
    )
}
