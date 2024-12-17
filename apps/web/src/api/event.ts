import { IGetEventCategoriesResponse, IGetEventsByCategoryResponse } from '@/types/event'
import { SERVER_URL } from '../../config'

export async function getEventsByCategory(category: string, page: number, limit: number): Promise<IGetEventsByCategoryResponse> {
    const res = await fetch(`${SERVER_URL}/v1/events/category/${category}?page=${page}&limit=${limit}`, {
        method: 'GET',
        // TODO: add authorization Header
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}

export async function getEventsCategories(): Promise<IGetEventCategoriesResponse> {
    const res = await fetch(`${SERVER_URL}/v1/events/categories`, {
        method: 'GET',
        // TODO: add authorization Header
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}
