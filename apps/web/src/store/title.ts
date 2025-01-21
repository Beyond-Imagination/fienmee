import { create } from 'zustand'

interface TitleStore {
    title: string
    setTitle: (title: string) => void
}

export const titleStore = create<TitleStore>(set => ({
    title: '',
    setTitle: title => {
        set({ title })
    },
}))
