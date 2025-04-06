import asyncify from 'express-asyncify'
import express, { Request, Response, Router } from 'express'
import { ScheduleModel } from '@/models'
import middlewares from '@/middlewares'

const router: Router = asyncify(express.Router())
router.use(middlewares.auth.verifyToken)

router.post('/', middlewares.schedules.addScheduleMiddleware, async (req: Request, res: Response) => {
    const { name, eventId, startDate, endDate, address, location, description, images } = req.body
    const schedule = await ScheduleModel.create({
        name: name,
        eventId: eventId,
        authorId: req.user._id.toString(),
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
    const filterOption = {
        from: new Date(req.query.from as string) || new Date(0),
        to: new Date(req.query.to as string) || new Date(),
    }

    const userId = req.user?._id.toString()
    const schedules = await ScheduleModel.findByUserId(userId, filterOption)
    const convertDateToString = (date: Date) => {
        // date.getMonth()는 0부터 시작하는 month의 index를 반환한다.
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const groupedSchedule = schedules.reduce((groupedSchedule, schedule) => {
        const startDate = new Date(schedule.startDate)
        const endDate = new Date(schedule.endDate)
        for (const d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            if (!groupedSchedule[convertDateToString(d)]) groupedSchedule[convertDateToString(d)] = []
            groupedSchedule[convertDateToString(d)].push(schedule)
        }
        return groupedSchedule
    })

    res.status(200).json({
        schedules: groupedSchedule,
    })
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
