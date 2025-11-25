import express, { Router } from 'express'
import asyncify from 'express-asyncify'
import { bindingCargo, getCargo } from 'express-cargo'

import { NotificationModel, NotificationTokenModel } from '@/models'
import { verifyToken } from '@/middlewares/auth'
import { GetNotificationPayload, PostNotificationReadPayload, PutNotificationTokenPayload } from '@/types/payload'

const router: Router = asyncify(express.Router())

router.get('/', verifyToken, bindingCargo(GetNotificationPayload), async (req, res) => {
    const { page, limit } = getCargo<GetNotificationPayload>(req)
    const options = { sort: { createdAt: -1 }, page, limit }
    const result = await NotificationModel.findByUserId(req.user._id, options)
    res.status(200).json({
        notifications: result.docs,
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

router.put('/token', verifyToken, bindingCargo(PutNotificationTokenPayload), async (req, res) => {
    const { deviceId, token, platform } = getCargo<PutNotificationTokenPayload>(req)
    await NotificationTokenModel.findOneAndUpdate(
        { deviceId: deviceId },
        {
            token: token,
            platform: platform,
            userId: req.user._id,
        },
        {
            upsert: true,
        },
    )
    res.sendStatus(204)
})

router.post('/:id/read', verifyToken, bindingCargo(PostNotificationReadPayload), async (req, res) => {
    const { id } = getCargo<PostNotificationReadPayload>(req)
    await NotificationModel.updateOne({ _id: id }, { isRead: true })
    res.sendStatus(204)
})

export default router
