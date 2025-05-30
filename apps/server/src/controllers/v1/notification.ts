import mongoose from 'mongoose'
import express, { Router } from 'express'
import asyncify from 'express-asyncify'
import { NotificationTokenModel } from '@/models'
import { InternalServerError } from '@/types/errors'
import { DeviceIdNotRegisteredError, DuplicateNotificationTokenError } from '@/types/errors/notification'
import { verifyToken } from '@/middlewares/auth'

const router: Router = asyncify(express.Router())

interface Fields {
    token: string
    platform: string
    userId?: mongoose.Types.ObjectId
}

router.post('/token', async (req, res) => {
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

router.put('/token', verifyToken({ required: false }), async (req, res) => {
    if (!req.body.deviceId) {
        throw new DeviceIdNotRegisteredError()
    }

    const updateFields: Fields = {
        token: req.body.token,
        platform: req.body.platform,
    }
    if (req.user !== null) {
        updateFields.userId = req.user._id
    }

    await NotificationTokenModel.findOneAndUpdate({ deviceId: req.body.deviceId }, updateFields)
    res.sendStatus(204)
})

export default router
