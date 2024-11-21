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

export default router
