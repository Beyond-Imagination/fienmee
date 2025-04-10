import { IPostReviewRequest, IPostReviewResponse } from '@fienmee/types'
import { SERVER_URL } from '@/config'

export async function postReview(request: IPostReviewRequest): Promise<IPostReviewResponse> {
    const res = await fetch(`${SERVER_URL}/v1/events/${request.uri.id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(request.body),
    })

    if (!res.ok) {
        throw await res.json()
    }
    return res.json()
}
