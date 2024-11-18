import { Request, Response } from 'express'

import { EnquiryModel } from '@/models/enquiry'

// TODO: add verify user middleware
export const createEnquiry = async (req: Request, res: Response) => {
    const enquiry = await EnquiryModel.create({
        userId: req.user._id,
        title: req.body.title,
        body: req.body.body,
    })
    res.status(200).json({
        enquiryId: enquiry._id,
    })
}
