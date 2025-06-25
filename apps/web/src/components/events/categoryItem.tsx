'use client'

import Link from 'next/link'

import { CategoryCode, ICategory } from '@fienmee/types'
import { BaseCategoryIcon, HottestCategoryIcon, WrittenCategoryIcon } from '@/components/icon'
import { categoryStore, titleStore } from '@/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleInterest } from '@/api/user'

interface Props {
    category: ICategory
    isFavorites: boolean
}

export function CategoryItem({ category, isFavorites }: Props) {
    const queryClient = useQueryClient()

    const { setCategory } = categoryStore()
    const { setTitle } = titleStore()
    const onClick = () => {
        setCategory(category)
        setTitle(category.title)
    }
    const toggleInterestMutation = useMutation({
        mutationFn: (categoryId: string) => {
            return toggleInterest({
                body: {
                    interest: categoryId,
                },
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['categories'] })
        },
    })
    if (category._id === CategoryCode.MYEVENT) {
        return (
            <Link className="flex flex-row w-full items-center justify-start p-4 gap-4" href={`/events/category`} onClick={onClick}>
                <WrittenCategoryIcon width="2.5rem" height="2.5rem" />
                <div className="text-3xl text-center">{category.title}</div>
            </Link>
        )
    } else if (category._id === CategoryCode.HOTEVENT) {
        return (
            <Link className="flex flex-row w-full items-center justify-start p-4 gap-4" href={`/events/category`} onClick={onClick}>
                <HottestCategoryIcon width="2.5rem" height="2.5rem" />
                <div className="text-3xl text-center">{category.title}</div>
            </Link>
        )
    } else {
        const onIconClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation()
            e.preventDefault()
            toggleInterestMutation.mutate(category._id)
        }
        return (
            <div className="flex flex-row w-full items-center justify-start p-4 gap-4">
                <button onClick={onIconClick}>
                    <BaseCategoryIcon width="2.5rem" height="2.5rem" isFavorites={isFavorites} />
                </button>
                <Link className="text-3xl text-center pt-1" href={`/events/category`} onClick={onClick}>
                    {category.title}
                </Link>
            </div>
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
