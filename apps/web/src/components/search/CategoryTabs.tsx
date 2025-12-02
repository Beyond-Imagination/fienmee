'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { CATEGORY_ICON } from '@/components/icon/Categoryicon'
import type { StaticImageData } from 'next/image'

// 서버 타이틀을 그대로 사용
const ALIAS: Record<string, string> = {}

function normalizeList(list: string[]): string[] {
    const mapped = list.map(n => ALIAS[n] ?? n)
    return Array.from(new Set(mapped))
}

function normalizeOne(name?: string): string | undefined {
    if (!name) return undefined
    return ALIAS[name] ?? name
}

export default function CategoryTabs({ items, current, onChange }: { items: string[]; current?: string; onChange: (value: string) => void }) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const rowRef = useRef<HTMLDivElement>(null)
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
    const lblRefs = useRef<(HTMLSpanElement | null)[]>([])

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
                                {hasIcon(name) ? <div className="mb-2 leading-none">{iconByName(name, active)}</div> : null}
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

                <div className="absolute left-[-24px] right-[-24px] bottom-0 h-[2px] bg-gray-100 z-0" />

                <span
                    className="absolute bottom-0 h-[3px] rounded-full bg-[#FF9575] z-10 transition-[left] duration-200"
                    style={{ left, width: INDICATOR_W }}
                />
            </div>
        </div>
    )
}

function hasIcon(name: string) {
    return Object.prototype.hasOwnProperty.call(CATEGORY_ICON, name)
}

function iconByName(name: string, active: boolean) {
    const src: StaticImageData | undefined = CATEGORY_ICON[name as keyof typeof CATEGORY_ICON]
    if (!src) return null
    const size = 20
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
