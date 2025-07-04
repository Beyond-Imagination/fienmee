import { toZonedTime } from 'date-fns-tz'

import { CategoryCode, categoryMapTitleToCode } from '@fienmee/types/api'
import { getSeoulData } from '@/services/seoul/seoul.data'
import { logger } from '@/utils/logger'
import { ICulturalEvent } from '@/types/seoul.data'
import { SeoulDataUpdateError } from '@/types/errors'
import { EventsModel } from '@/models'

const BATCH_SIZE = 1000

function parseEndDate(date: string): Date {
    const datePart = date.split(' ')[0]
    return toZonedTime(`${datePart} 23:59:59`, 'Asia/Seoul')
}

async function saveSeoulData(data: Array<ICulturalEvent>, today: Date): Promise<void> {
    const bulkOps = []

    for (const event of data) {
        const startDate = toZonedTime(event.STRTDATE, 'Asia/Seoul')
        const endDate = parseEndDate(event.END_DATE)
        if (startDate < today && endDate < today) {
            continue
        }

        const registeredAt = toZonedTime(event.RGSTDATE, 'Asia/Seoul')
        bulkOps.push({
            updateOne: {
                filter: {
                    name: event.TITLE,
                    registeredAt: registeredAt,
                },
                update: {
                    name: event.TITLE,
                    address: `서울시 ${event.GUNAME} ${event.PLACE}`,
                    location: {
                        type: 'Point',
                        coordinates: [parseFloat(event.LAT), parseFloat(event.LOT)], // API 값이 위도 경도 값이 바껴있음
                    },
                    startDate: startDate,
                    endDate: endDate,
                    // TODO: change url to hyperlink
                    description: `프로그램 소개: ${event.PROGRAM}\n${event.ETC_DESC && `기타내용: ${event.ETC_DESC}\n`}${event.PLAYER && `공연자: ${event.PLAYER}\n`}\n상세정보보기: ${event.HMPG_ADDR}\n주최기관: ${event.ORG_NAME}(${event.ORG_LINK})`,
                    photo: [event.MAIN_IMG],
                    cost: event.IS_FREE === '무료' ? '무료' : event.USE_FEE,
                    category: [categoryMapTitleToCode[event.CODENAME] || CategoryCode.OTHERS],
                    targetAudience: [event.USE_TRGT],
                    registeredAt: registeredAt,
                },
                upsert: true,
            },
        })
    }
    try {
        if (bulkOps.length > 0) {
            await EventsModel.bulkWrite(bulkOps)
            logger.info(`Successfully updated ${bulkOps.length} pieces of Seoul cultural event information in mongo DB`)
        } else {
            logger.info(`No new Seoul cultural event information found, so no update is performed`)
        }
    } catch (error) {
        throw new SeoulDataUpdateError(error)
    }
}

export async function fetchAndSaveSeoulData(): Promise<void> {
    let index = 0
    let dataCount = 1000
    const today = new Date()
    while (index < Math.ceil(dataCount / BATCH_SIZE)) {
        const st = index * BATCH_SIZE + 1
        const end = Math.min((index + 1) * BATCH_SIZE, dataCount)
        const result = await getSeoulData(st, end)
        await saveSeoulData(result.culturalEventInfo.row, today)
        await new Promise(resolve => setTimeout(resolve, 500)) // 각 요청마다 500ms 간격 추가 (동시 요청 불가능)
        if (index === 0) {
            dataCount = result.culturalEventInfo.list_total_count
        }
        index++
    }
}
