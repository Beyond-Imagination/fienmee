import { getAgreementsResponse } from '@fienmee/types/api'
import { BE_URL } from '@/config'

export async function getAgreements(): Promise<getAgreementsResponse> {
    const res = await fetch(`${BE_URL}/v1/agreements`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw await res.json()
    }

    return res.json()
}
