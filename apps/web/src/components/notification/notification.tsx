import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { INotification } from '@fienmee/types'
import NotificationIcon from '@/components/icon/notificationIcon'
import { postNotificationRead } from '@/api/notification'
import { getEventDetail } from '@/api/event'
import { eventStore } from '@/store'

interface Props {
    notification: INotification
}

export default function Notification({ notification }: Props) {
    const router = useRouter()
    const { setEvent } = eventStore()
    const formattingDate = (date: Date) => {
        const newDate = new Date(date)
        return `${newDate.getFullYear()}.${String(newDate.getMonth() + 1).padStart(2, '0')}.${String(newDate.getDate()).padStart(2, '0')} ${String(newDate.getHours()).padStart(2, '0')}:${String(newDate.getMinutes()).padStart(2, '0')}`
    }
    const onNavigate = async () => {
        const parts = notification.navigate.split(':')
        const id = parts.pop() as string
        const path = parts.join('/')
        const event = await getEventDetail(id)
        setEvent(event)
        router.push(path)
    }
    const mutation = useMutation({
        mutationFn: (id: string) => postNotificationRead(id),
        onSuccess: async () => {
            notification.isRead = true
            await onNavigate()
        },
    })
    const onClick = async () => {
        if (!notification.isRead) {
            mutation.mutate(notification._id)
        } else {
            await onNavigate()
        }
    }

    return (
        <div className={`flex flex-row items-center w-full p-4 gap-4 ${notification.isRead ? 'bg-white' : 'bg-[#FFEDE8]'}`} onClick={() => onClick()}>
            <NotificationIcon type={notification.type} />
            <div className="flex flex-col gap-1">
                <span className="font-bold">{notification.title}</span>
                <span className="text-sm">{notification.body}</span>
                <span className="text-sm text-[#757575]">{formattingDate(notification.createdAt)}</span>
            </div>
        </div>
    )
}
