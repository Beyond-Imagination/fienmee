import express, { Router } from 'express'
import asyncify from 'express-asyncify'

import { NotificationTokenModel } from '@/models'
import { verifyToken } from '@/middlewares/auth'
import { InternalServerError } from '@/types/errors'
import { DeviceIdNotRegisteredError, DuplicateNotificationTokenError } from '@/types/errors/notification'

const router: Router = asyncify(express.Router())

router.post('/token', verifyToken, async (req, res) => {
    try {
        await NotificationTokenModel.create({
            token: req.body.token,
            deviceId: req.body.deviceId,
            platform: req.body.platform,
        })
        res.sendStatus(204)
    } catch (error) {
        if (error.code === 11000) {
            throw new DuplicateNotificationTokenError()
        } else {
            throw new InternalServerError()
        }
    }
})

router.put('/token', verifyToken, async (req, res) => {
    if (!req.body.deviceId) {
        throw new DeviceIdNotRegisteredError()
    }

    await NotificationTokenModel.findOneAndUpdate(
        { deviceId: req.body.deviceId },
        {
            token: req.body.token,
            platform: req.body.platform,
            userId: req.user._id,
        },
    )
    res.sendStatus(204)
})

export default router
