'use client'

import { useEffect } from 'react'

import { NotificationList } from '@/components/notification/notificationList'
import { titleStore } from '@/store'

export default function Page() {
    const { setTitle } = titleStore()
    useEffect(() => {
        setTitle('알림 내역')
    }, [setTitle])

    return <NotificationList />
}
