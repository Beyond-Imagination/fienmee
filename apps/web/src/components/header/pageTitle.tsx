'use client'

import { useRouter } from 'next/navigation'

import { categoryStore } from '@/store'
import { BackButtonIcon } from '@/components/icon'

export function PageTitleHeader() {
    const router = useRouter()
    const { category, setCategory } = categoryStore()

    const onClick = () => {
        router.back()
        setCategory('')
    }

    return (
        <div className="flex flex-row items-center w-full bg-white pt-10 p-2">
            <button className="absolute z-1 ps-4" onClick={onClick}>
                <BackButtonIcon width={30} height={30} />
            </button>
            <span className="text-3xl text-center font-semibold w-full">{category}</span>
        </div>
    )
}
