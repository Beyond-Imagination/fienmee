import { authenticate, authFailure, callback, logout } from '@/controllers/v1/auth'
import express from 'express'
import asyncify from 'express-asyncify'

const router = asyncify(express.Router())

const providers = ['kakao', 'google']

providers.forEach(provider => {
    router.get(`/${provider}`, authenticate(provider))
    router.get(`/${provider}/callback`, ...callback(provider))
})

router.get('/failure', authFailure)

router.post('/logout', logout)

export default router
