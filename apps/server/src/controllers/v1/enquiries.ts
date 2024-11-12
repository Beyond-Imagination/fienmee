import express, { Request, Response } from 'express'
import asyncify from 'express-asyncify/lib'

const router = asyncify(express.Router())

router.post('/', async (req: Request, res: Response) => {
    // TODO: make enquiry model
})

export default router
