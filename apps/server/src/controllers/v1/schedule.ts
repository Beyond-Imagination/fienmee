import asyncify from 'express-asyncify'
import express, { Request, Response } from 'express'
import { ScheduleModel } from '@/models/schedule'

const router = asyncify(express.Router())

// TODO: add validator(eventId, authorId)
router.post('/', async (req: Request, res: Response) => {
    const { name, eventId, startDate, endDate, address, location, description, images } = req.body
    const schedule = await ScheduleModel.create({
        name: name,
        eventId: eventId,
        startDate: startDate,
        endDate: endDate,
        address: address,
        location: location,
        description: description,
        images: images,
    })
    res.status(201).json({
        scheduleId: schedule._id,
    })
})

// todo: jwt 에서 user의 identifier 추출 후 미들웨어로 포함
router.get('/', async (req: Request, res: Response) => {
    const DEFAULT_PAGE_OFFSET = 0
    const DEFAULT_LIMIT = 10

    let { page, limit } = req.params
    page = page ?? DEFAULT_PAGE_OFFSET
    limit = limit ?? DEFAULT_LIMIT

    const userId = req.body.userId
    return await ScheduleModel.findByUserId(userId, { page, limit })
})

export default router
