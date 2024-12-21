import express, { Request, Response, Router } from 'express'
import asyncify from 'express-asyncify'

import { EventsModel } from '@/models/event'

const router: Router = asyncify(express.Router())

router.get('/categories', async (req: Request, res: Response) => {
    // TODO: find user favorite categories
    // TODO: remove hard coding after discussion
    const categories = [
        '경관',
        '교육',
        '국악',
        '기타',
        '독주',
        '독창회',
        '무용',
        '문화',
        '뮤지컬',
        '미술',
        '시민화합',
        '역사',
        '연극',
        '영화',
        '예술',
        '오페라',
        '자연',
        '전시',
        '전통',
        '체험',
        '축제',
        '콘서트',
        '클래식',
    ]
    res.status(200).json({
        favoritesCategories: [''],
        categories: categories,
    })
})

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

router.get('/category/:category', async (req: Request, res: Response) => {
    const options = { sort: { startDate: 1, endDate: 1, createdAt: -1 }, page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 }
    const category = req.params.category
    const result = await EventsModel.findByCategory(category, options)

    const events = result.docs.map(event => ({ ...event.toJSON() }))

    res.status(200).json({
        events: events,
        page: {
            totalDocs: result.totalDocs,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            page: result.page,
            limit: result.limit,
        },
    })
})

export default router
