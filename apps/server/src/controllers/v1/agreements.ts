import express, { Request, Response, Router } from 'express'
import asyncify from 'express-asyncify'

const router: Router = asyncify(express.Router())

router.get('/', async (req: Request, res: Response) => {
    res.json({
        documents: [
            {
                name: '서비스 이용 약관',
                required: true,
                link: `documents/terms-of-service.md`,
            },
            {
                name: '개인정보 수집 및 이용 동의',
                required: true,
                link: `documents/privacy-policy.md`,
            },
        ],
    })
})

export default router
