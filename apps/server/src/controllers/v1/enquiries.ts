import express, { Request, Response, Router } from 'express'
import asyncify from 'express-asyncify'

import { EnquiryModel } from '@/models'
import { verifyToken } from '@/middlewares/auth'

const router: Router = asyncify(express.Router())

router.post('/', verifyToken, async (req: Request, res: Response) => {
    const enquiry = await EnquiryModel.create({
        userId: req.user._id,
        title: req.body.title,
        body: req.body.body,
    })
    res.status(200).json({
        enquiryId: enquiry._id,
    })
})

router.get('/', verifyToken, async (req: Request, res: Response) => {
    const options = { sort: { createdAt: -1 }, page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 }
    const result = await EnquiryModel.findByUser(req.user._id, options)
    res.status(200).json({
        enquiries: result.docs,
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
