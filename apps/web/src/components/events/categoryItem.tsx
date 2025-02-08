'use client'

import Link from 'next/link'

import { CategoryCode, ICategory } from '@fienmee/types'
import { BaseCategoryIcon, HottestCategoryIcon, WrittenCategoryIcon } from '@/components/icon'
import { categoryStore, titleStore } from '@/store'

interface Props {
    category: ICategory
    isFavorites: boolean
}

export function CategoryItem({ category, isFavorites }: Props) {
    const { setCategory } = categoryStore()
    const { setTitle } = titleStore()
    const onClick = () => {
        setCategory(category)
        setTitle(category.title)
    }
    if (category.code === CategoryCode.MYEVENT) {
        return (
            <Link className="flex flex-row w-full items-center justify-start p-4 gap-4" href={`/events/category`} onClick={onClick}>
                <WrittenCategoryIcon width={40} height={40} />
                <div className="text-3xl text-center">{category.title}</div>
            </Link>
        )
    } else if (category.code === CategoryCode.HOTEVENT) {
        return (
            <Link className="flex flex-row w-full items-center justify-start p-4 gap-4" href={`/events/category`} onClick={onClick}>
                <HottestCategoryIcon width={40} height={40} />
                <div className="text-3xl text-center">{category.title}</div>
            </Link>
        )
    } else {
        // TODO: add logic making to Favorites
        return (
            <Link className="flex flex-row w-full items-center justify-start p-4 gap-4" href={`/events/category`} onClick={onClick}>
                <BaseCategoryIcon width={40} height={40} isFavorites={isFavorites} />
                <div className="text-3xl text-center pt-1">{category.title}</div>
            </Link>
        )
    }
}

export function CategoryItemSkeleton() {
    return (
        <div className="flex flex-row w-full items-center justify-start p-4 gap-4">
            <div className="w-12 h-10 bg-gray-300 animate-pulse rounded-full" />
            <div className="w-full h-10 bg-gray-300 rounded animate-pulse" />
        </div>
    )
}
