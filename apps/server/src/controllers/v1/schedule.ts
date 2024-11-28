import asyncify from 'express-asyncify'
import express, { Request, Response } from 'express'
import { ScheduleModel } from '@/models/schedule'

const router = asyncify(express.Router())

// TODO: add validator(eventId, authorId)
router.post('/', async (req: Request, res: Response) => {
    const { name, eventId, authorId, startDate, endDate, address, location, description, images } = req.body
    const schedule = await ScheduleModel.create({
        name: name,
        eventId: eventId,
        authorId: authorId,
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
    const options = {
        page: req.query.page || 0,
        limit: req.query.limit || 100,
    }

    const filterOption = {
        from: req.query.from || new Date(0),
        to: req.query.to || new Date(),
    }

    const userId = req.body.userId
    const schedules = await ScheduleModel.findByUserId(userId, filterOption, options)

    res.status(200).json(schedules)
})

export default router
