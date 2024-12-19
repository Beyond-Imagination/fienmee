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
        <div className="flex flex-row items-center w-full pt-10 p-2 fixed top-0 left-0 right-0 z-10 bg-inherit">
            <button className="absolute z-1 ps-4" onClick={onClick}>
                <BackButtonIcon width={30} height={30} />
            </button>
            <div className="text-3xl text-center font-semibold w-full">{category}</div>
        </div>
    )
}
