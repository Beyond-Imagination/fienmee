import asyncify from 'express-asyncify'
import express, { Request, Response, Router } from 'express'

import { ScheduleModel } from '@/models'
import middlewares from '@/middlewares'
import { getUserDailyScheduleCount } from '@/services/schedule'

const router: Router = asyncify(express.Router())
router.use(middlewares.auth.verifyToken)

router.post('/', middlewares.schedules.addScheduleMiddleware, async (req: Request, res: Response) => {
    const { name, eventId, startDate, endDate, address, location, description, isAllDay } = req.body
    const schedule = await ScheduleModel.create({
        name: name,
        eventId: eventId,
        authorId: req.user._id,
        startDate: startDate,
        endDate: endDate,
        address: address,
        location: location,
        description: description,
        isAllDay: isAllDay,
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

router.get('/dailyCount', async (req: Request, res: Response) => {
    const from = new Date(req.query.from as string) || new Date(0)
    const to = new Date(req.query.to as string) || new Date()
    const timezone = (req.query.timezone as string) || 'Asia/Seoul'

    const dailyScheduleCount = await getUserDailyScheduleCount(req.user, from, to, timezone)
    res.status(200).json(dailyScheduleCount)
})

router.get('/:id', middlewares.schedules.verifyAuthorMiddleware, async (req: Request, res: Response) => {
    const schedule = await ScheduleModel.findOne({ _id: req.params.id })
    res.status(200).json(schedule)
})

router.delete('/:id', middlewares.schedules.verifyAuthorMiddleware, async (req: Request, res: Response) => {
    await ScheduleModel.deleteOne({ _id: req.params.id })
    res.sendStatus(204)
})

router.put('/:id', middlewares.schedules.verifyAuthorMiddleware, async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, startDate, endDate, description, location, address } = req.body
    const updated = await ScheduleModel.findOneAndUpdate(
        { _id: id },
        {
            name: name,
            startDate: startDate,
            endDate: endDate,
            description: description,
            address: address,
            location: location,
        },
        { new: true },
    )
    res.status(200).json(updated)
})

export default router
