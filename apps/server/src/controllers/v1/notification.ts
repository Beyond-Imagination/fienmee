import express, { Router } from 'express'
import asyncify from 'express-asyncify'

import { NotificationTokenModel } from '@/models'
import { verifyToken } from '@/middlewares/auth'

const router: Router = asyncify(express.Router())

router.get('/', verifyToken, async (req, res) => {})

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

export default router
