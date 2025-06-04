'use client'

import { NotificationList } from '@/components/notification/notificationList'
import { titleStore } from '@/store'
import { useEffect } from 'react'

export default function Page() {
    const { setTitle } = titleStore()
    useEffect(() => {
        setTitle('알림 내역')
    }, [setTitle])

    return <NotificationList />
}
