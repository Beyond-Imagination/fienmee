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

export async function getTourFestivalData(startDate: Date, page: number, limit: number): Promise<IResponseFestivalApi> {
    const params = new URLSearchParams({
        ...defaultParams,
        eventStartDate: format(startDate, 'yyyyMMdd'),
        pageNo: String(page),
        numOfRows: String(limit),
        arrange: 'R',
    })
    const res = await fetch(`${TOUR_API_URL}/searchFestival2?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = (await res.json()) as IResponseFestivalApi
    if (data.response.header.resultCode !== '0000') {
        throw new TourDataServerError()
    }
    return data
}

export async function getTourDataDetail(contentId: string): Promise<IResponseFestivalDetailApi> {
    const params = new URLSearchParams({
        ...defaultParams,
        contentId: contentId,
        contentTypeId: '15',
    })
    const res = await fetch(`${TOUR_API_URL}/detailIntro2?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = (await res.json()) as IResponseFestivalDetailApi
    if (data.response.header.resultCode !== '0000') {
        throw new TourDataServerError()
    }
    return data
}

export async function getTourFestivalDataInfo(contentId: string): Promise<IResponseFestivalInfoApi> {
    const params = new URLSearchParams({
        ...defaultParams,
        contentId: contentId,
        contentTypeId: '15',
    })
    const res = await fetch(`${TOUR_API_URL}/detailInfo2?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = (await res.json()) as IResponseFestivalInfoApi
    if (data.response.header.resultCode !== '0000') {
        throw new TourDataServerError()
    }
    return data
}
