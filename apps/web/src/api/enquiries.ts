import { IGetEnquiriesResponse, IPostEnquiryRequest, IPostEnquiryResponse } from '@fienmee/types'
import { SERVER_URL } from '@/config'

export async function postEnquiry(request: IPostEnquiryRequest): Promise<IPostEnquiryResponse> {
    const res = await fetch(`${SERVER_URL}/v1/enquiries`, {
        method: 'POST',
        body: JSON.stringify(request.body),
    })
    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}

export async function getEnquiries(page: number, limit: number): Promise<IGetEnquiriesResponse> {
    const res = await fetch(`${SERVER_URL}/v1/enquiries?page=${page}&limit=${limit}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}
