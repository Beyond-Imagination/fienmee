import { TOUR_API_KEY, TOUR_API_URL } from '@/config'
import { TourDataServerError } from '@/types/errors'
import { format } from 'date-fns'
import { IResponseFestivalApi, IResponseFestivalDetailApi, IResponseFestivalInfoApi } from '@/types/tour.data'

const defaultParams = {
    MobileApp: 'Fienmee',
    MobileOS: 'WEB',
    ServiceKey: TOUR_API_KEY,
    _type: 'json',
}

function checkResponse(data) {
    if (data.response.header.resultCode !== '0000') {
        throw new TourDataServerError()
    }
}

async function fetchTourApi(endPoint: string, params: URLSearchParams) {
    const url = `${TOUR_API_URL}${endPoint}?${params.toString()}`
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) throw new TourDataServerError()
    console.log(res)

    const data = await res.json()

    checkResponse(data)
    return data
}

export async function getTourFestivalData(startDate: Date, page: number, limit: number): Promise<IResponseFestivalApi> {
    const params = new URLSearchParams({
        ...defaultParams,
        eventStartDate: format(startDate, 'yyyyMMdd'),
        pageNo: String(page),
        numOfRows: String(limit),
        arrange: 'R',
    })
    return (await fetchTourApi('/searchFestival2', params)) as IResponseFestivalApi
}

export async function getTourDataDetail(contentId: string): Promise<IResponseFestivalDetailApi> {
    const params = new URLSearchParams({
        ...defaultParams,
        contentId: contentId,
        contentTypeId: '15',
    })
    return (await fetchTourApi('/detailIntro2', params)) as IResponseFestivalDetailApi
}

export async function getTourFestivalDataInfo(contentId: string): Promise<IResponseFestivalInfoApi> {
    const params = new URLSearchParams({
        ...defaultParams,
        contentId: contentId,
        contentTypeId: '15',
    })
    return (await fetchTourApi('/detailInfo2', params)) as IResponseFestivalInfoApi
}
