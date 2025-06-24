import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'

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
    const [selected, setSelected] = useState<Set<string>>(new Set([...selectedCategories].map(sel => sel._id)))

    const { data } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: () => getEventsCategories(),
        refetchOnWindowFocus: false,
    })
    const categories = [...data.favoriteCategories, ...data.categories]

    const handleCategory = (category: ICategory) => {
        setSelected(prev => {
            const updated = new Set(prev)
            if (updated.has(category._id)) {
                updated.delete(category._id)
            } else {
                updated.add(category._id)
            }
            return updated
        })
    }

    return (
        <FullScreenDialog isOpen={isOpen} hasClose={true} onClose={onClose}>
            <div className="flex flex-col h-full p-2 gap-4">
                <h1 className="text-xl font-bold">카테고리 선택</h1>
                <ul className="h-[75%] w-full overflow-y-auto">
                    {categories.map(category => (
                        <li
                            key={category._id}
                            className={`p-2 border-b cursor-pointer ${selected.has(category._id) ? 'bg-[#FF9575] text-white' : ''}`}
                            onClick={() => handleCategory(category)}
                        >
                            {category.title}
                        </li>
                    ))}
                </ul>
                <button
                    className="w-full bg-[#FF9575] text-white py-3 text-center font-semibold rounded-lg"
                    onClick={() => {
                        handleCategories(new Set(categories.filter(cat => selected.has(cat._id))))
                        onClose()
                    }}
                >
                    선택하기
                </button>
            </div>
        </FullScreenDialog>
    )
}
