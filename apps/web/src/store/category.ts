import { ICategory } from '@fienmee/types'
import { create } from 'zustand'

interface CategoryStore {
    category: ICategory
    setCategory: (category: ICategory) => void
    clearCategory: () => void
}

export const categoryStore = create<CategoryStore>(set => ({
    category: {
        _id: '',
        title: '',
    },
    setCategory: category => {
        set({ category })
    },
    clearCategory: () => {
        set({ category: { _id: '', title: '' } })
    },
}))
