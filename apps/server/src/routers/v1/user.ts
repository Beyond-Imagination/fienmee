import express from 'express'
import asyncify from 'express-asyncify'
import { ensureAuthenticated } from '@/middlewares/v1/auth'
import { logout } from '@/controllers/v1/auth'

const router = asyncify(express.Router())

router.get('/logout', logout)

router.get('/profile', ensureAuthenticated, (req, res) => {
    const user = req.user
    res.json({ user })
})

export default router
