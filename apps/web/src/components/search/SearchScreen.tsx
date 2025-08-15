'use client'

import { useEffect, useMemo, useState } from 'react'
import CategoryTabs from '@/components/search/CategoryTabs'
import SearchResultCard from '@/components/search/SearchResultCard'
import { SearchIcon } from '@/components/icon'
import { ClipLoader } from 'react-spinners'

type Props = { initialQuery?: string; initialCategory?: string }

type EventItem = {
    id: string
    title: string
    region: string
    period: { start: string; end: string }
    image: string
    category: string
}

const MOCK: EventItem[] = [
    {
        id: '1',
        title: '진해 벚꽃 축제',
        region: '경남 창원시 진해구',
        period: { start: '2025-04-01', end: '2025-04-10' },
        image: 'https://www.hygn.go.kr/_res/tour/img/sub/04/CherryBlossom_img02.jpg',
        category: '팝업행사',
    },
    {
        id: '2',
        title: '서울 세계 불꽃 축제',
        region: '서울 송파구',
        period: { start: '2025-05-20', end: '2025-06-02' },
        image: 'https://www.hanwha.co.kr/upload/news/press/2024/10/02/1727831937311_62.jpg',
        category: '문화행사',
    },
    {
        id: '3',
        title: '벚꽃',
        region: '부산 금정구',
        period: { start: '2025-04-05', end: '2025-04-07' },
        image: 'https://mediahub.seoul.go.kr/uploads/mediahub/2025/04/auKJgrjhemWLuzyMwmtLrYSuxKfuhNYk.jpg',
        category: '패션',
    },
]

const CATEGORIES = ['팝업행사', '패션', '스포츠', '야외활동', '문화행사', '음악', '취미'] as const
const fmtPeriod = ({ start, end }: { start: string; end: string }) => `${start.replaceAll('-', '.')} ~ ${end.replaceAll('-', '.')}`

// 주소창 업데이트
const shallowSetParam = (next: Record<string, string | ''>) => {
    const url = new URL(window.location.href)
    Object.entries(next).forEach(([k, v]) => {
        if (v) url.searchParams.set(k, v as string)
        else url.searchParams.delete(k)
    })
    window.history.replaceState(null, '', url.toString())
}

export default function SearchScreen({ initialQuery = '', initialCategory = '' }: Props) {
    const [query, setQuery] = useState(initialQuery)
    const [category, setCategory] = useState(initialCategory)

    // 결과 & 로딩
    const [items, setItems] = useState<EventItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // 필터(목데이터)
    const filterLocal = (q: string, c: string): EventItem[] => {
        const ql = q.trim().toLowerCase()
        let filtered = MOCK.filter(e => {
            const byQ = !ql || e.title.toLowerCase().includes(ql) || e.region.toLowerCase().includes(ql)
            const byC = !c || e.category === c
            return byQ && byC
        })
        if (filtered.length < 3) {
            const extra = MOCK.filter(m => !filtered.some(f => f.id === m.id))
            filtered = [...filtered, ...extra].slice(0, 3)
        }
        return filtered
    }

    // 카테고리/검색어 변경 시 결과만 로딩 처리
    useEffect(() => {
        let alive = true
        setIsLoading(true)
        const id = setTimeout(() => {
            if (!alive) return
            const next = filterLocal(query, category)
            setItems(next)
            setIsLoading(false)
        }, 300)
        return () => {
            alive = false
            clearTimeout(id)
        }
    }, [query, category])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        shallowSetParam({ query, category })
    }

    const hasNoResult = useMemo(() => !isLoading && items.length === 0, [isLoading, items])

    return (
        <div className="mx-auto w-full max-w-[420px] min-h-screen bg-white overflow-x-hidden">
            {/* 검색바 */}
            <form onSubmit={onSubmit} className="sticky top-0 z-10 bg-white px-12 pt-4 pb-2 mb-4">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#F5F5F5]">
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="검색어를 입력하세요"
                        className="flex-1 bg-transparent outline-none text-[15px] indent-4"
                        aria-label="검색어"
                    />
                    <button type="submit" className="shrink-0 rounded-full p-1" aria-label="검색">
                        <SearchIcon width="20" height="20" />
                    </button>
                </div>
            </form>

            {/* 카테고리 탭 */}
            <CategoryTabs
                items={[...CATEGORIES]}
                current={category}
                onChange={c => {
                    const next = c === category ? '' : c
                    setCategory(next)
                    shallowSetParam({ category: next, query })
                }}
            />

            {/* 카테고리와 결과 간격 */}
            <div className="h-2" />

            {/* 결과 */}
            <main className="px-12 py-4">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <ClipLoader color="#FF6B6B" size={28} />
                    </div>
                ) : hasNoResult ? (
                    <p className="mt-12 text-center text-gray-500">검색 결과가 없습니다.</p>
                ) : (
                    <ul className="space-y-8">
                        {items.map(it => (
                            <li key={it.id}>
                                <SearchResultCard
                                    title={it.title}
                                    region={it.region}
                                    period={fmtPeriod(it.period)}
                                    image={it.image}
                                    imageHeight={300} // 여기서 카드 이미지 높이 제어
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </main>

            <div className="h-16" />
        </div>
    )
}
