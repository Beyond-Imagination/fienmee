import { getTourDataDetail, getTourFestivalData, getTourFestivalDataInfo } from '@/services/tourApi/tour.data'
import { ITourDataInfo, ITourFestivalData } from '@/types/tour.data'
import { toZonedTime } from 'date-fns-tz'
import { CategoryCode, categoryMapTourCodeToCode } from '@fienmee/types'
import { EventsModel } from '@/models'
import { logger } from '@/utils/logger'
import { TourDataUpdateError } from '@/types/errors'
import { parse, set } from 'date-fns'

const BATCH_SIZE = 100

function parseDate(date: string): Date {
    return parse(date, 'yyyyMMdd', new Date())
}

function parseEndDate(date: string): Date {
    const parsedDate = parseDate(date)
    const finalDate = set(parsedDate, { hours: 23, minutes: 59, seconds: 59 })
    return toZonedTime(finalDate, 'Asia/Seoul')
}

function getCopyrightText(cpyrhDivCd: string): string {
    return cpyrhDivCd === 'Type1' || cpyrhDivCd === 'Type3' ? '해당 데이터는 한국관광공사에서 제공됨을 알려드립니다.' : ''
}

function makeDescription(eventDescription: ITourDataInfo[]) {
    const description = []
    eventDescription.sort((a, b) => parseInt(a.serialnum) - parseInt(b.serialnum))
    eventDescription.forEach(item => description.push(`${item.infoname}: ${item.infotext}`))
    return description.join('\n')
}

async function saveTourData(data: ITourFestivalData[], today: Date) {
    const bulkOps = []
    for (const event of data) {
        const startDate = toZonedTime(parseDate(event.eventstartdate), 'Asia/Seoul')
        const endDate = parseEndDate(event.eventenddate)
        if (startDate < today && endDate < today) continue

        const [eventDetail, eventDescription] = await Promise.all([getTourDataDetail(event.contentid), getTourFestivalDataInfo(event.contentid)])

        const registeredAt = toZonedTime(parse(event.createdtime, 'yyyyMMddHHmmss', new Date()), 'Asia/Seoul')
        const images = []
        if (event.firstimage) images.push(event.firstimage)
        else if (event.firstimage2) images.push(event.firstimage2)

        bulkOps.push({
            updateOne: {
                filter: {
                    name: event.title,
                    registeredAt: registeredAt,
                },
                update: {
                    name: event.title,
                    address: `${event.addr1}${event.addr2 === '' ? '' : `(${event.addr2})`}`,
                    location: {
                        type: 'Point',
                        coordinates: [parseFloat(event.mapx), parseFloat(event.mapy)],
                    },
                    startDate: startDate,
                    endDate: endDate,
                    description: `${makeDescription(eventDescription.response.body.items.item)}\n${getCopyrightText(event.cpyrhDivCd)}`,
                    photo: images,
                    cost: eventDetail.response.body.items.item.usetimefestival || '',
                    category: [categoryMapTourCodeToCode[event.lclsSystm3] || CategoryCode.OTHERS],
                    targetAudience: [eventDetail.response.body.items.item.agelimit],
                    registeredAt: registeredAt,
                },
                upsert: true,
            },
        })
    }
    try {
        if (bulkOps.length > 0) {
            await EventsModel.bulkWrite(bulkOps)
            logger.info(`Successfully updated ${bulkOps.length} pieces of Tour API festival information in mongo DB`)
        } else {
            logger.info(`No new Tour API festival information found, so no update is performed`)
        }
    } catch (error) {
        throw new TourDataUpdateError(error)
    }
}

export async function fetchAndSaveTourFestivalData(): Promise<void> {
    let index = 1
    let hasMoreData = true
    let dataCount = 0
    const today = new Date()
    while (hasMoreData) {
        const result = await getTourFestivalData(today, index, BATCH_SIZE)
        const body = result.response.body
        await saveTourData(body.items.item, today)
        await new Promise(resolve => setTimeout(resolve, 500)) // 각 요청마다 500ms 간격 추가
        dataCount += body.numOfRows
        if (dataCount < body.totalCount) index++
        else hasMoreData = false
    }
}
