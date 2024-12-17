'use client'

import { useRouter } from 'next/navigation'

import { EventList } from '@/components/events/eventList'
import { BackButtonIcon } from '@/components/icon'
import { categoryStore } from '@/store'

export default function Page() {
    const router = useRouter()
    const { category, setCategory } = categoryStore()

    const onClick = () => {
        router.back()
        setCategory('')
    }
    if (!category) {
        return (
            <div className="h-screen flex items-center justify-center px-4">
                <div className="text-lg text-center">잘못된 접근입니다.</div>
            </div>
        )
    }
    return (
        <div className="h-min-screen items-center justify-items-center min-h-screen bg-inherit overflow-hidden">
            {/*TODO: Remove temporary header*/}
            <div className="flex flex-row items-center w-full pt-10 p-2 fixed top-0 left-0 right-0 z-10 bg-inherit">
                <button className="absolute z-1 ps-4" onClick={onClick}>
                    <BackButtonIcon width={30} height={30} />
                </button>
                <div className="text-3xl text-center font-semibold w-full">{category}</div>
            </div>
            <div className="w-full h-full bg-inherit mt-24 overflow-y-auto">
                <EventList category={category} />
            </div>
        </div>
    )
}
