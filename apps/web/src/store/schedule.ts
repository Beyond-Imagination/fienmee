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
        type: '',
        coordinates: [],
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
