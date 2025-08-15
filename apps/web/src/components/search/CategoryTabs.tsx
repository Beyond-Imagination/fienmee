'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { CATEGORY_ICON } from '@/components/icon/Categoryicon'

// 1) 허용 카테고리(아이콘이 있는 것만)
const VALID = ['문화행사', '스포츠', '야외활동', '음악', '취업', '팝업행사', '패션'] as const
type CategoryName = (typeof VALID)[number]

// 2) 별칭(들어오면 매핑해서 사용) — 필요 시 추가
const ALIAS: Record<string, CategoryName> = {
    취미: '문화행사',
    레저: '야외활동',
    공연음악: '음악',
}

const VALID_SET = new Set<string>(VALID)

function normalizeList(list: string[]): CategoryName[] {
    // 별칭→정규명 → 유효한 것만 → 중복 제거
    const mapped = list
        .map(n => ALIAS[n] ?? n) // 별칭 치환
        .filter((n): n is CategoryName => VALID_SET.has(n)) // 유효만
    return Array.from(new Set(mapped))
}

function normalizeOne(name?: string): CategoryName | undefined {
    if (!name) return undefined
    const n = ALIAS[name] ?? name
    return VALID_SET.has(n) ? (n as CategoryName) : undefined
}

export default function CategoryTabs({ items, current, onChange }: { items: string[]; current?: string; onChange: (value: string) => void }) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const rowRef = useRef<HTMLDivElement>(null)
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
    const lblRefs = useRef<(HTMLSpanElement | null)[]>([])

    // 정규화된 목록/현재값
    const normItems = useMemo(() => normalizeList(items), [items])
    const normCurrent = useMemo(() => normalizeOne(current), [current])

    const INDICATOR_W = 60
    const [left, setLeft] = useState(0)

    const activeIndex = useMemo(() => {
        const idx = normItems.findIndex(x => x === normCurrent)
        return idx >= 0 ? idx : 0
    }, [normItems, normCurrent])

    const measure = useCallback(() => {
        const row = rowRef.current
        const btn = btnRefs.current[activeIndex]
        const lbl = lblRefs.current[activeIndex]
        if (!row || !btn || !lbl) return

        const labelW = lbl.offsetWidth
        const labelCenter = (btn.offsetWidth - labelW) / 2 + labelW / 2
        const x = btn.offsetLeft - row.scrollLeft + labelCenter - INDICATOR_W / 2
        setLeft(x)
    }, [activeIndex])

    useEffect(() => {
        const row = rowRef.current
        const wrap = wrapRef.current
        if (!row || !wrap) return

        const onScroll = () => requestAnimationFrame(measure)
        const ro = new ResizeObserver(() => requestAnimationFrame(measure))

        ro.observe(wrap)
        ro.observe(row)
        row.addEventListener('scroll', onScroll, { passive: true })

        const raf = requestAnimationFrame(measure)

        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            row.removeEventListener('scroll', onScroll)
        }
    }, [measure, activeIndex])

    return (
        <div className="select-none">
            <div ref={wrapRef} className="relative px-8">
                <div ref={rowRef} className="flex items-center gap-6 overflow-x-auto pb-3 no-scrollbar">
                    {normItems.map((name, i) => {
                        const active = normCurrent === name
                        return (
                            <button
                                key={name}
                                ref={el => {
                                    btnRefs.current[i] = el
                                }}
                                onClick={() => onChange(active ? '' : name)}
                                className="flex flex-col items-center px-2 py-1 shrink-0"
                            >
                                <div className="mb-2 leading-none">{iconByName(name, active)}</div>
                                <span
                                    ref={el => {
                                        lblRefs.current[i] = el
                                    }}
                                    className={`text-[12px] ${active ? 'font-semibold text-black' : 'text-gray-500'}`}
                                >
                                    {name}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* 회색 베이스 라인 */}
                <div className="absolute left-[-24px] right-[-24px] bottom-0 h-[2px] bg-gray-100 z-0" />

                {/* 주황 인디케이터 라인 */}
                <span
                    className="absolute bottom-0 h-[3px] rounded-full bg-[#FF9575] z-10 transition-[left] duration-200"
                    style={{ left, width: INDICATOR_W }}
                />
            </div>
        </div>
    )
}

function iconByName(name: CategoryName, active: boolean) {
    const src = CATEGORY_ICON[name] ?? CATEGORY_ICON['문화행사']
    const size = name === '팝업행사' ? 21 : 20

    return (
        <Image
            src={src}
            alt=""
            width={size}
            height={size}
            draggable={false}
            priority={false}
            className={`block ${active ? '' : 'opacity-45'}`}
            style={{ imageRendering: 'crisp-edges' }}
        />
    )
}
