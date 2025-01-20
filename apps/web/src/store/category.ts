import { create } from 'zustand'

interface CategoryStore {
    category: string
    setCategory: (category: string) => void
}

export const categoryStore = create<CategoryStore>(set => ({
    category: '',
    setCategory: category => {
        set({ category })
    },
}))
