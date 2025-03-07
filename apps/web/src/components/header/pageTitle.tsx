'use client'

import { useRouter } from 'next/navigation'

import { categoryStore, titleStore } from '@/store'
import { BackButtonIcon } from '@/components/icon'

export function PageTitleHeader() {
    const router = useRouter()
    const { title, setTitle } = titleStore()
    const { category, clearCategory } = categoryStore()

    const onClick = () => {
        if (!title && category) {
            setTitle(category.title)
        } else {
            setTitle('')
            clearCategory()
        }
        router.back()
    }

    return (
        <div className="flex flex-row items-center w-full h-[6.25rem] bg-white pt-4 p-2">
            <button className="absolute z-1 ps-4" onClick={onClick}>
                <BackButtonIcon width="1.75rem" height="1.75rem" />
            </button>
            <span className="text-3xl text-center font-semibold w-full">{title}</span>
        </div>
    )
}
