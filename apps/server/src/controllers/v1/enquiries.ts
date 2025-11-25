import express, { Request, Response, Router } from 'express'
import asyncify from 'express-asyncify'
import { bindingCargo, getCargo } from 'express-cargo'

import { EnquiryModel } from '@/models'
import { verifyToken } from '@/middlewares/auth'
import { PostEnquiryPayload } from '@/types/payload/enquiry'

const router: Router = asyncify(express.Router())

router.post('/', verifyToken, bindingCargo(PostEnquiryPayload), async (req: Request, res: Response) => {
    const { title, body } = getCargo<PostEnquiryPayload>(req)

    const enquiry = await EnquiryModel.create({
        userId: req.user._id,
        title,
        body,
    })
    res.status(200).json({
        enquiryId: enquiry._id,
    })
})

export default router
