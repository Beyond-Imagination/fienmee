import { create } from 'zustand'
import { ICategory, IEvent } from '@fienmee/types'

interface eventState {
    event: IEvent
    setEvent: (event: IEvent) => void
    resetEvent: () => void
}

const initEvent: IEvent = {
    _id: '',
    name: '',
    address: '',
    location: {
        type: 'Point',
        coordinates: [126.570667, 33.450701],
    },
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    photo: [],
    cost: '',
    likeCount: 0,
    commentCount: 0,
    category: [] as ICategory[],
    targetAudience: [],
    createdAt: new Date(),
    isAuthor: false,
    isAllDay: false,
    isLiked: false,
}

export const eventStore = create<eventState>(set => ({
    event: initEvent,
    setEvent: event => {
        set({ event })
    },
    resetEvent: () => {
        set({ event: initEvent })
    },
}))
