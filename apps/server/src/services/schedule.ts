import { eachDayOfInterval, format } from 'date-fns'

import { ScheduleModel, User } from '@/models'
import { IDailyCountMap } from '@fienmee/types/api'

export async function getUserDailyScheduleCount(user: User, from: Date, to: Date, timezone: string): Promise<IDailyCountMap> {
    const dates = eachDayOfInterval({ start: from, end: to }).map(d => format(d, 'yyyy-MM-dd'))
    const counts = await ScheduleModel.findDailyCountByUserId(user, from, to, timezone)

    const dailyCount: IDailyCountMap = {}

    dates.forEach(date => {
        dailyCount[date] = 0
    })
    counts.forEach(day => {
        dailyCount[day.date] = day.count
    })

    return dailyCount
}
