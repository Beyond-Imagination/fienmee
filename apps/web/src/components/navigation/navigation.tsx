'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

import {
    AddEventButtonIcon,
    AddScheduleButtonIcon,
    CalenderNavigationIcon,
    CategoryNavigationIcon,
    HomeNavigationIcon,
    MyInfoNavigationIcon,
    NavigationPlusIcon,
} from '@/components/icon'
import { NavigationItem } from '@/components/navigation/navigationItem'
import { categoryStore } from '@/store'

export function Navigation() {
    const pathname = usePathname()
    const { setCategory } = categoryStore()
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div
                className={`fixed grid grid-cols-2 w-48 h-48 z-30 bg-white rounded-full shadow-[0_-1px_4px_rgba(0,0,0,0.25)] transition-all duration-700 pb-16 ${isVisible ? 'opacity-100 -translate-y-16' : 'opacity-0 translate-y-10'}`}
            >
                <div className="absolute top-5 h-1/3 left-1/2 w-[1px] bg-gray-300" />
                <NavigationItem uri={'/events/register'} text={'행사 등록'} isClicked={false} onClick={() => setCategory('행사 등록')}>
                    <AddEventButtonIcon width={32} height={32} />
                </NavigationItem>
                <NavigationItem uri={'/schedule/register'} text={'일정 등록'} isClicked={false} onClick={() => setCategory('일정 등록')}>
                    <AddScheduleButtonIcon width={32} height={32} />
                </NavigationItem>
            </div>
            <div className="grid h-32 max-w-lg grid-cols-5 mx-auto font-medium bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.25)] z-40">
                <NavigationItem uri={'/'} text={'홈'} isClicked={pathname === '/'}>
                    <HomeNavigationIcon isClicked={pathname === '/'} width={48} height={48} />
                </NavigationItem>
                <NavigationItem uri={'/schedule'} text={'캘린더'} isClicked={pathname === '/schedule'}>
                    <CalenderNavigationIcon isClicked={pathname === '/schedule'} width={48} height={48} />
                </NavigationItem>
                <div className="inline-flex flex-col items-center justify-center p-2">
                    <button
                        className="w-20 h-20 inline-flex flex-col items-center justify-center bg-transparent shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        <NavigationPlusIcon width={22} height={22} />
                    </button>
                </div>
                <NavigationItem uri={'/events'} text={'카테고리'} isClicked={pathname === '/events'}>
                    <CategoryNavigationIcon isClicked={pathname === '/events'} width={48} height={48} />
                </NavigationItem>
                <NavigationItem uri={'/setting'} text={'마이페이지'} isClicked={pathname === '/setting'}>
                    <MyInfoNavigationIcon isClicked={pathname === '/setting'} width={48} height={48} />
                </NavigationItem>
            </div>
        </div>
    )
}
