import {
    IEvent,
    IGetEventCategoriesResponse,
    IGetEventsByCategoryResponse,
    IPostEventCommentRequest,
    IPostEventRequest,
    IPutEventRequest,
    IGetPresignedUrlRequest,
    IGetPresignedUrlResponse,
    IGetEventCommentsResponse,
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

export async function getUploadUrl(request: IGetPresignedUrlRequest): Promise<IGetPresignedUrlResponse> {
    const query = new URLSearchParams(request as unknown as Record<string, string>).toString()
    const res = await fetch(`${SERVER_URL}/v1/events/s3/upload-url?${query}`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw await res.json()
    }

    return res.json()
}

export const getViewUrl = async (key: string) => {
    const res = await fetch(`${SERVER_URL}/v1/events/s3/view-url?key=${encodeURIComponent(key)}`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw await res.json()
    }

    const data = await res.json()
    return data.signedUrl
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

export async function getEventDetail(eventId: string): Promise<IEvent> {
    const res = await fetch(`${SERVER_URL}/v1/events/${eventId}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}

export async function getEventCommentsByEventId(eventId: string, page: number = 1, limit: number = 10): Promise<IGetEventCommentsResponse> {
    const res = await fetch(`${SERVER_URL}/v1/events/${eventId}/comments?page=${page}&limit=${limit}`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}
