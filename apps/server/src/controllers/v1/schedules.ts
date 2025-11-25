import asyncify from 'express-asyncify'
import express, { Request, Response, Router } from 'express'
import { bindingCargo, getCargo } from 'express-cargo'

import { ScheduleModel } from '@/models'
import middlewares from '@/middlewares'
import { getUserDailyScheduleCount } from '@/services/schedule'
import { GetScheduleDailyCountPayload, GetSchedulePayload, IdPayload, PostSchedulePayload, PutSchedulePayload } from '@/types/payload'

const router: Router = asyncify(express.Router())
router.use(middlewares.auth.verifyToken)

router.post('/', bindingCargo(PostSchedulePayload), middlewares.schedules.addScheduleMiddleware, async (req: Request, res: Response) => {
    const { name, eventId, startDate, endDate, address, location, description, isAllDay } = getCargo<PostSchedulePayload>(req)
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

router.get('/', bindingCargo(GetSchedulePayload), async (req: Request, res: Response) => {
    const { from: fromString, to: toString, page, limit } = getCargo<GetSchedulePayload>(req)
    const today = new Date()
    const from = fromString ? new Date(fromString) : new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const to = toString ? new Date(toString) : new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    const userId = req.user?._id.toString()
    const schedules = await ScheduleModel.findByUserId(userId, { from, to }, { page, limit })

    res.status(200).json(schedules)
})

router.get('/dailyCount', bindingCargo(GetScheduleDailyCountPayload), async (req: Request, res: Response) => {
    const { from: fromString, to: toString, timezone } = getCargo<GetScheduleDailyCountPayload>(req)
    const today = new Date()
    const from = fromString ? new Date(fromString) : new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const to = toString ? new Date(toString) : new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    const dailyScheduleCount = await getUserDailyScheduleCount(req.user, from, to, timezone)
    res.status(200).json(dailyScheduleCount)
})

router.get('/:id', bindingCargo(IdPayload), middlewares.schedules.verifyAuthorMiddleware, async (req: Request, res: Response) => {
    const { id } = getCargo<IdPayload>(req)
    const schedule = await ScheduleModel.findOne({ _id: id })
    res.status(200).json(schedule)
})

router.delete('/:id', bindingCargo(IdPayload), middlewares.schedules.verifyAuthorMiddleware, async (req: Request, res: Response) => {
    const { id } = getCargo<IdPayload>(req)
    await ScheduleModel.deleteOne({ _id: id })
    res.sendStatus(204)
})

router.put('/:id', bindingCargo(PutSchedulePayload), middlewares.schedules.verifyAuthorMiddleware, async (req: Request, res: Response) => {
    const { id, name, startDate, endDate, isAllDay, description, location, address } = getCargo<PutSchedulePayload>(req)
    const updated = await ScheduleModel.findOneAndUpdate(
        { _id: id },
        { name, startDate, endDate, isAllDay, description, address, location },
        { new: true },
    )
    res.status(200).json(updated)
})

export default router
