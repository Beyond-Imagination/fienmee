import { create } from 'zustand'
import { IEvent } from '@/types/event'

interface eventState {
    event: IEvent
    setEvent: (event: IEvent) => void
}

export const eventStore = create<eventState>(set => ({
    event: {
        _id: '',
        name: '',
        address: '',
        location: {
            type: '',
            coordinates: [],
        },
        startDate: new Date(),
        endDate: new Date(),
        description: '',
        photo: [],
        cost: '',
        likeCount: 0,
        commentCount: 0,
        category: [],
        targetAudience: [],
        createdAt: new Date(),
    },
    setEvent: event => {
        set({ event })
    },
}))
