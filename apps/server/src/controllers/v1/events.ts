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

export default router
