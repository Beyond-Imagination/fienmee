import express from 'express'
import asyncify from 'express-asyncify'
import { createEnquiry } from '@/controllers/v1/enquiries'

const router = asyncify(express.Router())

// TODO: add verify user middleware
router.post('/', createEnquiry)

export default router
