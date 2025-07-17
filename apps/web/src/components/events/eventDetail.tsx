import { useMemo } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'

import { IEvent } from '@fienmee/types'
import { CommentIcon, ShareIcon } from '@/components/icon'
import { EventMap } from '@/components/events/eventMap'
import EventOption from '@/components/events/eventOption'
import EventPhoto from '@/components/events/eventPhoto'
import EventLikes from '@/components/events/eventLikes'
import TabBar from '@/components/tabBar'
import EventCommentInput from '@/components/comment/commentInputField'
import { CommentList } from '@/components/comment/commentList'
import { ko } from 'date-fns/locale'
import useKeyboardOpen from '@/hooks/useKeyboardOpen'

interface Props {
    event: IEvent
}

const formatDate = (date: Date) => {
    return format(date, 'yyyy.MM.dd(eee)', { locale: ko })
}

export default function EventDetail({ event }: Props) {
    const isKeyboardOpen = useKeyboardOpen()
    const [items, links, selected] = useMemo(() => {
        const items = ['상세정보', '리뷰']
        const links = ['/events/detail', '/events/review']
        const selected = '상세정보'

        return [items, links, selected]
    }, [])

    return (
        <div className={`flex flex-col gap-6 px-4 ${isKeyboardOpen ? 'pb-0' : 'pb-12'}`}>
            <TabBar items={items} links={links} selected={selected} />
            <div className="w-full h-64 overflow-x-auto">
                <div className="flex">
                    <EventPhoto photo={event.photo} name={event.name} />
                </div>
            </div>
            <div className="flex flex-col p-4 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="text-xl font-bold">{event.name}</div>
                    <div className="flex flex-row justify-center items-center gap-2">
                        {/* TODO: add share function */}
                        <button className="">
                            <ShareIcon width="1.5rem" height="1.5rem" />
                        </button>
                        {event.isAuthor && <EventOption eventId={event._id} />}
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">시간</div>
                        <div className="text-sm font-bold">
                            {formatDate(event.startDate)} - {formatDate(event.endDate)}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">이용 요금</div>
                        <div className="text-sm font-bold">{event.cost}</div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">장소</div>
                        <div className="text-sm font-bold">{event.address}</div>
                    </div>
                </div>
                <div className="w-full h-[200px]">
                    <EventMap lng={event.location.coordinates[0]} lat={event.location.coordinates[1]} />
                </div>
                <div className="mt-6">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap break-all">{event.description}</p>
                </div>
            </div>
            <div className="flex flex-col p-4 space-y-4">
                <div className="flex items-center">
                    <EventCommentInput eventId={event._id} />
                </div>
                <CommentList eventId={event._id} />
            </div>
            {!isKeyboardOpen && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 pb-safe z-10">
                    <div className="flex justify-between items-center">
                        <EventLikes />
                        <div className="flex items-center space-x-3">
                            <CommentIcon width="1.25rem" height="1.25rem" />
                            <div className="text-sm">{event.commentCount}</div>
                        </div>
                        <Link href={'/schedules/register'} className="rounded-lg text-white bg-[#FF9575] px-6 py-1.5">
                            내 일정 추가
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
