import { getSeoulData } from '@/utils/seoul.data'
import { ICulturalEvent } from '@/types/seoul.data'
import { EventsModel } from '@/models/event'
import { logger } from '@/utils/logger'
import { SeoulDataUpdateError } from '@/types/errors'

const BATCH_SIZE = 1000

async function fetchData(): Promise<ICulturalEvent[]> {
    const temp = await getSeoulData(1, 1)
    const dataCount = temp.culturalEventInfo.list_total_count
    let data: Array<ICulturalEvent> = []
    for (let index = 0; index < Math.ceil(dataCount / BATCH_SIZE); index++) {
        const st = index * BATCH_SIZE + 1
        const end = Math.min((index + 1) * BATCH_SIZE, dataCount)
        const result = await getSeoulData(st, end)
        data = data.concat(result.culturalEventInfo.row)
        await new Promise(resolve => setTimeout(resolve, 500)) // 각 요청마다 500ms 간격 추가 (동시 요청 불가능)
    }
    return data
}

export async function fetchAndSaveSeoulData(): Promise<void> {
    const bulkOps = []
    const data = await fetchData()
    // 중복 검사
    const existingEvents = await EventsModel.find({
        $or: data.map(event => ({
            name: event.TITLE,
            startDate: new Date(event.STRTDATE),
            endDate: new Date(event.END_DATE),
        })),
    }).select('name startDate endDate')

    for (const event of data) {
        const exists = existingEvents.some(
            existingEvent =>
                existingEvent.name === event.TITLE &&
                existingEvent.startDate.getTime() === new Date(event.STRTDATE).getTime() &&
                existingEvent.endDate.getTime() === new Date(event.END_DATE).getTime(),
        )
        if (!exists) {
            bulkOps.push({
                insertOne: {
                    document: {
                        name: event.TITLE,
                        address: `서울시 ${event.GUNAME} ${event.PLACE}`,
                        location: {
                            type: 'Point',
                            coordinates: [parseFloat(event.LAT), parseFloat(event.LOT)], // API 값이 위도 경도 값이 바껴있음
                        },
                        startDate: new Date(event.STRTDATE),
                        endDate: new Date(event.END_DATE),
                        describe: `프로그램 소개: ${event.PROGRAM}\n기타내용: ${event.ETC_DESC}\n상세정보보기: ${event.HMPG_ADDR}\n주최기관: ${event.ORG_NAME}(${event.ORG_LINK})`,
                        photo: [event.MAIN_IMG],
                        cost: event.IS_FREE === '무료' ? 0 : event.USE_FEE,
                        category: event.CODENAME.split(/[\s\-/_\\]/),
                        targetAudience: [event.USE_TRGT],
                    },
                },
            })
        }
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
