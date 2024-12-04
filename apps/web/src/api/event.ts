import { IGetEventsByCategoryResponse } from '@/types/event'
import { SERVER_URL } from '../../config'

export async function getEventsByCategory(category: string, query: object): Promise<IGetEventsByCategoryResponse> {
    const searchParams = new URLSearchParams({ ...query })
    const res = await fetch(`${SERVER_URL}/v1/events/category/${category}?${searchParams}`, {
        method: 'GET',
        // TODO: add authorization Header
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}
