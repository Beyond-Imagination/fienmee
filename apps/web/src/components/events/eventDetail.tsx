import { IEvent } from '@fienmee/types'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { CommentIcon, ShareIcon } from '@/components/icon'
import { EventMap } from '@/components/events/eventMap'
import EventOption from '@/components/events/eventOption'
import EventPhoto from '@/components/events/eventPhoto'
import EventLikes from '@/components/events/eventLikes'
import { useMemo } from 'react'
import TabBar from '@/components/tabBar'

interface Props {
    event: IEvent
}

dayjs.locale('ko')
const formatDate = (date: Date) => {
    return dayjs(date).format('YYYY.MM.DD(ddd)')
}

export default function EventDetail({ event }: Props) {
    const [items, links, selected] = useMemo(() => {
        const items = ['상세정보', '리뷰']
        const links = ['/events/detail', '/events/review']
        const selected = '상세정보'

        return [items, links, selected]
    }, [])

    return (
        <div className="flex flex-col gap-6 px-4">
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
            <div className="flex justify-between p-4 mt-4 pt-4 border-t border-gray-200">
                <EventLikes />
                <div className="flex items-center space-x-3">
                    <CommentIcon width="1.25rem" height="1.25rem" />
                    <div className="text-sm">{event.commentCount}</div>
                </div>
                {/* TODO: add share function */}
                <button className="flex items-center space-x-2">
                    <ShareIcon width="1.25rem" height="1.25rem" />
                    <div className="text-sm">공유하기</div>
                </button>
            </div>
            {/* TODO: add comment list */}
        </div>
    )
}
