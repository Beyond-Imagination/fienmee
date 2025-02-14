import { IGetEventCategoriesResponse, IGetEventsByCategoryResponse, IPostEventRequest, IPutEventRequest } from '@fienmee/types'

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

export async function registerEvent(eventData: IPostEventRequest): Promise<void> {
    const token = sessionStorage.getItem('access_token')
    const res = await fetch(`${SERVER_URL}/v1/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData.body),
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}

export async function updateEvent(request: IPutEventRequest): Promise<void> {
    const token = sessionStorage.getItem('access_token')
    const res = await fetch(`${SERVER_URL}/v1/events/${request.uri._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}
