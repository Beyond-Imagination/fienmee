export interface ICategory {
    _id: string
    title: string
}

export interface IGetEventCategoriesResponse {
    defaultCategories: ICategory[]
    categories: ICategory[]
    favoriteCategories: ICategory[]
}
