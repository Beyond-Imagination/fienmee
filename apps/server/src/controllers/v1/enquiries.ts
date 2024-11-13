import express, { Request, Response } from 'express'
import asyncify from 'express-asyncify'

import { EnquiryModel } from '@/models/enquiry'

const router = asyncify(express.Router())

// TODO: add verify user middleware
router.post('/', async (req: Request, res: Response) => {
    const enquiry = await EnquiryModel.create({
        userId: req.user._id,
        title: req.body.title,
        body: req.body.body,
    })
    res.status(200).json({
        enquiryId: enquiry._id,
    })
})

export default router
