import express, { Request, Response, Router } from 'express'
import asyncify from 'express-asyncify'

import { EnquiryModel } from '@/models'
import { verifyToken } from '@/middlewares/auth'

const router: Router = asyncify(express.Router())

router.post('/', verifyToken(), async (req: Request, res: Response) => {
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
