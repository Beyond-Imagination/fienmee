'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { getEventsByCategory, getEventsCategories } from '@/api/event'
import { fixedCategory, IEvent } from '@fienmee/types'
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

// 기간 포맷
const fmtPeriod = ({ start, end }: { start: string; end: string }) => {
    const s = start?.trim()
    const e = end?.trim()
    if (!s && !e) return '일정 미정'
    return `${s || '미정'} ~ ${e || '미정'}`
}

// 주소창 파라미터만 얕게 갱신
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
    const [dynCategories, setDynCategories] = useState<string[]>([])
    const [isCatLoading, setIsCatLoading] = useState(true)

    const [items, setItems] = useState<EventItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const lastReq = useRef(0)

    // 카테고리 불러오기(결과 있는 것만 노출, 없으면 첫 번째 자동선택)
    useEffect(() => {
        let alive = true
        ;(async () => {
            try {
                setIsCatLoading(true)
                const res = await getEventsCategories()
                const titles = [
                    ...(res.favoriteCategories?.map(c => c.title) ?? []),
                    ...(res.categories?.map(c => c.title) ?? []),
                    ...(res.defaultCategories?.map(c => c.title) ?? []),
                ]
                const deduped = Array.from(new Set(titles)).filter(Boolean)
                const available = await filterAvailableCategories(deduped)
                if (alive) {
                    setDynCategories(available)
                    if (category && !available.includes(category)) setCategory('')
                    if (!category && available.length > 0) setCategory(available[0])
                }
            } catch {
                if (alive) setDynCategories([])
            } finally {
                if (alive) setIsCatLoading(false)
            }
        })()
        return () => {
            alive = false
        }
    }, [])

    // 카테고리 변경 시 결과 로드 (중복 호출 가드)
    useEffect(() => {
        let alive = true
        const load = async () => {
            setIsLoading(true)
            const myReq = ++lastReq.current
            try {
                if (category) {
                    const code = titleToCode(category)
                    if (code) {
                        const res = await getEventsByCategory(code, 1, 10)
                        const mapped = res.events.map(mapEventToItem)
                        if (!alive || myReq !== lastReq.current) return
                        setItems(mapped)
                    } else {
                        if (!alive || myReq !== lastReq.current) return
                        setItems([])
                    }
                } else {
                    if (!alive || myReq !== lastReq.current) return
                    setItems([])
                }
            } catch {
                if (!alive || myReq !== lastReq.current) return
                setItems([])
            } finally {
                if (!alive || myReq !== lastReq.current) return
                setIsLoading(false)
            }
        }
        const id = setTimeout(load, 200)
        return () => {
            alive = false
            clearTimeout(id)
        }
    }, [category])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        shallowSetParam({ query, category })
    }

    const hasNoResult = useMemo(() => !isLoading && items.length === 0, [isLoading, items])

    return (
        <div className="mx-auto w-full max-w-[420px] min-h-screen bg-white overflow-x-hidden">
            {/* 검색창 */}
            <form onSubmit={onSubmit} className="sticky top-0 z-10 bg-white px-12 pt-4 pb-2 mb-4">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#F5F5F5]">
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="검색어를 입력하세요"
                        className="flex-1 bg-transparent outline-none text-[15px] indent-4"
                        aria-label="검색"
                    />
                    <button type="submit" className="shrink-0 rounded-full p-1" aria-label="검색">
                        <SearchIcon width="20" height="20" />
                    </button>
                </div>
            </form>

            {isCatLoading ? (
                <div className="flex justify-center py-10">
                    <ClipLoader color="#FF6B6B" size={28} />
                </div>
            ) : (
                <>
                    {/* 카테고리 탭 */}
                    <CategoryTabs
                        items={dynCategories}
                        current={category}
                        onChange={c => {
                            const next = c === category ? '' : c
                            setCategory(next)
                            shallowSetParam({ category: next, query })
                        }}
                    />

                    <div className="h-2" />

                    {/* 결과 목록 */}
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
                                            imageHeight={300}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </main>
                </>
            )}

            <div className="h-16" />
        </div>
    )
}

// 도우미
function titleToCode(title: string): string | undefined {
    const entries = Object.entries(fixedCategory) as [string, { title: string; code: string }][]
    const hit = entries.find(([, v]) => v.title === title)
    return hit?.[1].code
}

function mapEventToItem(e: IEvent): EventItem {
    const img = Array.isArray(e.photo) && e.photo.length > 0 ? e.photo[0] : ''
    const formatDate = (d: Date | string | undefined) => {
        if (!d) return ''
        const dt = d instanceof Date ? d : new Date(d)
        return Number.isNaN(dt.getTime()) ? '' : dt.toISOString().slice(0, 10)
    }
    return {
        id: e._id,
        title: e.name,
        region: e.address ?? '',
        period: { start: formatDate(e.startDate), end: formatDate(e.endDate) },
        image: img,
        category: Array.isArray(e.category) && e.category[0]?.title ? e.category[0].title : '',
    }
}

async function filterAvailableCategories(titles: string[]): Promise<string[]> {
    const entries = titles.map(t => ({ title: t, code: titleToCode(t) }))
    const checks = await Promise.allSettled(
        entries.map(async ({ title, code }) => {
            if (!code) return { title, ok: false }
            try {
                const res = await getEventsByCategory(code, 1, 1)
                return { title, ok: (res.events?.length ?? 0) > 0 }
            } catch {
                return { title, ok: false }
            }
        }),
    )
    return checks
        .filter(r => r.status === 'fulfilled' && (r as PromiseFulfilledResult<{ title: string; ok: boolean }>).value.ok)
        .map(r => (r as PromiseFulfilledResult<{ title: string; ok: boolean }>).value.title)
}
