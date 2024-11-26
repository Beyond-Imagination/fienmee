import express, { Request, Response } from 'express'
import asyncify from 'express-asyncify'

import { EventsModel } from '@/models/event'

const router = asyncify(express.Router())

router.post('/', async (req: Request, res: Response) => {
    await EventsModel.create({
        name: req.body.name,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        photo: req.body.photo,
        cost: req.body.cost,
        description: req.body.description,
        category: req.body.category,
        targetAudience: req.body.targetAudience,
    })
    res.sendStatus(204)
})

router.put('/:id', async (req: Request, res: Response) => {
    await EventsModel.updateOne(
        { _id: req.params.id },
        {
            name: req.body.name,
            location: req.body.location,
            startDate: req.body.date,
            endDate: req.body.endDate,
            photo: req.body.photo,
            cost: req.body.cost,
            description: req.body.description,
            category: req.body.category,
            targetAudience: req.body.targetAudience,
        },
    )
    res.sendStatus(204)
})

router.delete('/:id', async (req: Request, res: Response) => {
    // TODO : Delete comments
    await EventsModel.deleteOne({ _id: req.params.id })
    res.sendStatus(200)
})

router.get('/:id', async (req: Request, res: Response) => {
    const event = await EventsModel.findById(req.params.id)

    res.status(200).json(event)
})

export default router
