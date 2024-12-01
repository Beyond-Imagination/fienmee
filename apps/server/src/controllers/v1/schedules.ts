import asyncify from 'express-asyncify'
import express, { Request, Response, Router } from 'express'
import { ScheduleModel } from '@/models/schedule'
import middlewares from '@/middlewares'

const router: Router = asyncify(express.Router())

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

router.delete('/:id', middlewares.schedules.verifyAuthorMiddleware, async (req: Request, res: Response) => {
    await ScheduleModel.deleteOne({ _id: req.params.id })
    res.sendStatus(204)
})

router.put('/:id', async (req: Request, res: Response) => {
    // todo: 일정의 authorId와 실제 jwt에 포함된 userId가 같은지 검증하는 middleware 추가
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
