import { getSeoulData } from '@/utils/seoul.data'
import { ICulturalEvent } from '@/types/seoul.data'

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
    const data = await fetchData()
    console.log(data)
}
