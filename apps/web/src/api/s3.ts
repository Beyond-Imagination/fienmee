import { IGetPresignedUrlRequest, IGetPresignedUrlResponse } from '@fienmee/types'

import { SERVER_URL } from '@/config'

export async function getUploadUrl(request: IGetPresignedUrlRequest): Promise<IGetPresignedUrlResponse> {
    const query = new URLSearchParams(request as unknown as Record<string, string>).toString()
    const res = await fetch(`${SERVER_URL}/v1/s3/upload-url?${query}`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw await res.json()
    }

    return res.json()
}

export async function getViewUrl(key: string): Promise<IGetPresignedUrlResponse> {
    const res = await fetch(`${SERVER_URL}/v1/s3/view-url?key=${encodeURIComponent(key)}`, {
        method: 'GET',
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
