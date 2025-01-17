import { SERVER_URL } from '@/config'
import { IMakeNewScheduleRequest } from '@fienmee/types'

export async function makeNewSchedule(request: IMakeNewScheduleRequest) {
    const res = await fetch(`${SERVER_URL}/v1/schedules`, {
        method: 'POST',
        authorization: `bearer ${token}`,
        // TODO: add authorization Header
        body: JSON.stringify(request),
    })

    if (!res.ok) {
        throw new Error(`code: ${res.status}\ndescription: ${res.statusText}`)
    }
    return res.json()
}
