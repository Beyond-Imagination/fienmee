import { useMemo } from 'react'
import Link from 'next/link'

import TabBar from '@/components/tabBar'
import ReviewList from '@/components/review/reviewList'
import ReviewsStatistic from '@/components/review/reviewsStatistic'

export default function Page() {
    const [items, links, selected] = useMemo(() => {
        const items = ['상세정보', '리뷰']
        const links = ['/events/detail', '/events/review']
        const selected = '리뷰'

        return [items, links, selected]
    }, [])

    return (
        <div className="flex flex-col h-full overflow-y-auto gap-[0.9375rem] px-6">
            <TabBar items={items} links={links} selected={selected} />
            <ReviewsStatistic />
            <Link className="self-center w-full bg-[#FF9575] text-base text-white text-center rounded-lg py-2" href="/events/review/create">
                리뷰 작성하기
            </Link>
            <ReviewList />
        </div>
    )
}
