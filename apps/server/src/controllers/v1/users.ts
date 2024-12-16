import asyncify from 'express-asyncify'
import express, { Request, Response, Router } from 'express'

import { loginRequest, registerRequest } from '@/types/api'
import { UnknownUserError } from '@/types/errors/oauth'
import { User, UserModel } from '@/models/user'
import { issueJwt, getOAuthUser } from '@/services/oauth'

const router: Router = asyncify(express.Router())

router.post('/login', async (req: Request, res: Response) => {
    const request: loginRequest = req.body

    const oauthUser = await getOAuthUser(request)
    const user = await UserModel.findByProviderId(oauthUser.providerId)
    if (!user) {
        throw new UnknownUserError(new Error(`not found ${oauthUser.providerId}`))
    }

    const jwt = issueJwt(user)
    await UserModel.updateLogIn(user)
    res.status(200).json({
        accessToken: jwt,
    })
})

router.post('/register', async (req: Request, res: Response) => {
    const request: registerRequest = req.body

    const oauthUser = await getOAuthUser(request)
    const user: User = await UserModel.createUser(oauthUser)
    const jwt = issueJwt(user)
    res.status(200).json({
        accessToken: jwt,
    })
})

export default router
