import express, { Router } from 'express'
import asyncify from 'express-asyncify'

import { NotificationModel, NotificationTokenModel } from '@/models'
import { verifyToken } from '@/middlewares/auth'

const router: Router = asyncify(express.Router())

router.get('/', verifyToken, async (req, res) => {
    const options = { sort: { createdAt: -1 }, page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 }
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

router.put('/token', verifyToken, async (req, res) => {
    await NotificationTokenModel.findOneAndUpdate(
        { deviceId: req.body.deviceId },
        {
            token: req.body.token,
            platform: req.body.platform,
            userId: req.user._id,
        },
        {
            upsert: true,
        },
    )
    res.sendStatus(204)
})

router.post('/:id/read', verifyToken, async (req, res) => {
    await NotificationModel.updateOne({ _id: req.params.id }, { isRead: true })
    res.sendStatus(204)
})

export default router
