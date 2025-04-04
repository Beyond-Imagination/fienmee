import {
    IGetEventCategoriesResponse,
    IGetEventsByCategoryResponse,
    IPostEventCommentRequest,
    IPostEventRequest,
    IPutEventRequest,
} from '@fienmee/types'

import { SERVER_URL } from '@/config'

export async function getEventsByCategory(category: string, page: number, limit: number): Promise<IGetEventsByCategoryResponse> {
    const res = await fetch(`${SERVER_URL}/v1/events/category/${category}?page=${page}&limit=${limit}`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}

export async function getEventsCategories(): Promise<IGetEventCategoriesResponse> {
    const res = await fetch(`${SERVER_URL}/v1/events/categories`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}

export async function deleteEventById(id: string): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/events/${id}`, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}

export async function registerEvent(eventData: IPostEventRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/events`, {
        method: 'POST',
        body: JSON.stringify(eventData.body),
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}

export async function updateEvent(request: IPutEventRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/events/${request.uri._id}`, {
        method: 'PUT',
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}

export async function updateEventLikes(id: string) {
    const res = await fetch(`${SERVER_URL}/v1/events/${id}/likes`, {
        method: 'POST',
    })
    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}

export async function registerEventComments(request: IPostEventCommentRequest) {
    const res = await fetch(`${SERVER_URL}/v1/events/${request.eventId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment: request.comment }),
    })
    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return
}
