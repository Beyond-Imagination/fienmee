import asyncify from 'express-asyncify'
import express, { Request, Response, Router } from 'express'
import { ScheduleModel } from '@/models/schedule'
import middlewares from '@/middlewares'

const router: Router = asyncify(express.Router())

router.post('/', middlewares.schedules.addScheduleMiddleware, async (req: Request, res: Response) => {
    const { name, eventId, startDate, endDate, address, location, description, images } = req.body
    const schedule = await ScheduleModel.create({
        name: name,
        eventId: eventId,
        authorId: req.user._id.toString()
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

router.get('/', async (req: Request, res: Response) => {
    const options = {
        page: Number(req.query.page) || 0,
        limit: Number(req.query.limit) || 100,
    }

    const filterOption = {
        from: new Date(req.query.from as string) || new Date(0),
        to: new Date(req.query.to as string) || new Date(),
    }

    const userId = req.user?._id.toString()
    const schedules = await ScheduleModel.findByUserId(userId, filterOption, options)

    res.status(200).json(schedules)
})

router.delete('/:id', middlewares.schedules.verifyAuthorMiddleware, async (req: Request, res: Response) => {
    await ScheduleModel.deleteOne({ _id: req.params.id })
    res.sendStatus(204)
})

router.put('/:id', middlewares.schedules.verifyAuthorMiddleware, async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, startDate, endDate, description, images, location, address } = req.body
    const updated = await ScheduleModel.findOneAndUpdate(
        { _id: id },
        {
            name: name,
            startDate: startDate,
            endDate: endDate,
            description: description,
            address: address,
            location: location,
            images: images,
        },
    )
    res.status(200).json(updated)
})

export default router
