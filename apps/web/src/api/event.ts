import { IGetEventCategoriesResponse, IGetEventsByCategoryResponse } from '@fienmee/types'

import { SERVER_URL } from '@/config'

export async function getEventsByCategory(category: string, page: number, limit: number): Promise<IGetEventsByCategoryResponse> {
    const token = sessionStorage.getItem('access_token')
    const res = await fetch(`${SERVER_URL}/v1/events/category/${category}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}

export async function getEventsCategories(): Promise<IGetEventCategoriesResponse> {
    const token = sessionStorage.getItem('access_token')
    const res = await fetch(`${SERVER_URL}/v1/events/categories`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}

export async function deleteEventById(id: string): Promise<void> {
    const token = sessionStorage.getItem('access_token')
    const res = await fetch(`${SERVER_URL}/v1/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}
