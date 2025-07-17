import { create } from 'zustand'
import { IScheduleItem } from '@fienmee/types'

interface scheduleState {
    schedule: IScheduleItem
    setSchedule: (schedule: IScheduleItem) => void
}

const initSchedule: IScheduleItem = {
    _id: '',
    authorId: '',
    eventId: '',
    name: '',
    address: '',
    location: {
        type: 'Point',
        coordinates: [126.570667, 33.450701],
    },
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    isAllDay: false,
}

export const scheduleStore = create<scheduleState>(set => ({
    schedule: initSchedule,
    setSchedule: schedule => {
        set({ schedule })
    },
}))
