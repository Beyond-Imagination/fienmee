import { SEOUL_API_KEY, SEOUL_API_URL } from '@/config'
import { SeoulDataServerError } from '@/types/errors'
import { IGetSeoulDateResponse } from '@/types/seoul.data'

export async function getSeoulData(start_index: number, end_index: number): Promise<IGetSeoulDateResponse> {
    const res = await fetch(`${SEOUL_API_URL}/${SEOUL_API_KEY}/json/culturalEventInfo/${start_index}/${end_index}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) {
        throw new SeoulDataServerError()
    }
    return (await res.json()) as IGetSeoulDateResponse
}
