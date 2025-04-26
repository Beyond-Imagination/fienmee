import {
    IGetEventCategoriesResponse,
    IGetEventsByCategoryResponse,
    IPostEventCommentRequest,
    IPostEventRequest,
    IPutEventRequest,
    IGetPresignedUrlRequest,
    IGetPresignedUrlResponse,
} from '@fienmee/types'

import { SERVER_URL } from '@/config'

export async function getEventsByCategory(category: string, page: number, limit: number): Promise<IGetEventsByCategoryResponse> {
    const res = await fetch(`${SERVER_URL}/v1/events/category/${category}?page=${page}&limit=${limit}`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export async function getEventsCategories(): Promise<IGetEventCategoriesResponse> {
    const res = await fetch(`${SERVER_URL}/v1/events/categories`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export async function deleteEventById(id: string): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/events/${id}`, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw await res.json()
    }
    return
}

export async function registerEvent(eventData: IPostEventRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/events`, {
        method: 'POST',
        body: JSON.stringify(eventData.body),
    })

    if (!res.ok) {
        throw await res.json()
    }
    return
}

export async function updateEvent(request: IPutEventRequest): Promise<void> {
    const res = await fetch(`${SERVER_URL}/v1/events/${request.uri._id}`, {
        method: 'PUT',
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw await res.json()
    }
    return
}

export async function updateEventLikes(id: string) {
    const res = await fetch(`${SERVER_URL}/v1/events/${id}/likes`, {
        method: 'POST',
    })
    if (!res.ok) {
        throw await res.json()
    }
    return
}

export async function registerEventComments(request: IPostEventCommentRequest) {
    const res = await fetch(`${SERVER_URL}/v1/events/${request.eventId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment: request.comment }),
    })
    if (!res.ok) {
        throw await res.json()
    }
    return
}

export async function getPresignedUrl(request: IGetPresignedUrlRequest): Promise<IGetPresignedUrlResponse> {
    const res = await fetch(`${SERVER_URL}/v1/events/presigned-url`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    })

    if (!res.ok) {
        throw await res.json()
    }

    return res.json()
}

export async function uploadToS3(presignedUrl: string, file: File): Promise<void> {
    const res = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
    })

    if (!res.ok) {
        throw await res.json()
    }
}
