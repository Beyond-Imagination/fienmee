'use client'

import { useRouter } from 'next/navigation'

import { categoryStore, titleStore } from '@/store'
import { BackButtonIcon } from '@/components/icon'

export function PageTitleHeader() {
    const router = useRouter()
    const { category, setCategory } = categoryStore()
    const { title, setTitle } = titleStore()

    const onClick = () => {
        router.back()
        setTitle('')
        if (category) {
            setCategory('')
        }
    }

    return (
        <div className="sticky top-0 left-0 flex flex-row items-center w-full pt-10 p-2  z-10 bg-white">
            <button className="absolute z-1 ps-4" onClick={onClick}>
                <BackButtonIcon width={30} height={30} />
            </button>
            <span className="text-3xl text-center font-semibold w-full">{title}</span>
        </div>
    )
}
