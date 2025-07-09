'use client'

import { useRouter } from 'next/navigation'

import { categoryStore, titleStore } from '@/store'
import { BackButtonIcon } from '@/components/icon'

export function PageTitleHeader() {
    const router = useRouter()
    const { title, setTitle } = titleStore()
    const { category } = categoryStore()

    const onClick = () => {
        if (!title && category._id !== '') {
            setTitle(category.title)
        } else {
            setTitle('')
        }
        router.back()
    }

    return (
        <div className="flex flex-row w-full h-[5rem] items-center bg-white p-2">
            <button className="absolute z-1 ps-4" onClick={onClick}>
                <BackButtonIcon width="1.5rem" height="1.5rem" />
            </button>
            <span className="text-3xl text-center font-semibold w-full">{title}</span>
        </div>
    )
}
