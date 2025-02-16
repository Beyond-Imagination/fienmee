import asyncify from 'express-asyncify'
import express, { Request, Response, Router } from 'express'

import { loginRequest, registerRequest } from '@fienmee/types'

import { UnknownUserError } from '@/types/errors/oauth'
import { User, UserModel } from '@/models'
import { issueAccessToken, getOAuthUser, expireJwt, issueRefreshToken } from '@/services/oauth'
import { verifyToken } from '@/middlewares/auth'

const router: Router = asyncify(express.Router())

router.post('/login', async (req: Request, res: Response) => {
    const request: loginRequest = req.body

    const oauthUser = await getOAuthUser(request)
    const user = await UserModel.findByProviderId(oauthUser.providerId)
    if (!user) {
        throw new UnknownUserError(new Error(`not found ${oauthUser.providerId}`))
    }

    const accessToken = issueAccessToken(user)
    const refreshToken = issueRefreshToken(user)
    await UserModel.updateLogIn(user)

    res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
    })
})

router.delete('/logout', async (req: Request, res: Response) => {
    const jwt = req.headers['authorization']?.split(' ')?.[1]
    expireJwt(jwt)
    res.sendStatus(204)
})

router.post('/register', async (req: Request, res: Response) => {
    const request: registerRequest = req.body

    const oauthUser = await getOAuthUser(request)
    const user: User = await UserModel.createUser(oauthUser)

    const accessToken = issueAccessToken(user)
    const refreshToken = issueRefreshToken(user)

    res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
    })
})

router.get('/', verifyToken, async (req: Request, res: Response) => {
    res.status(200).json({
        id: req.user._id,
        nickname: req.user.nickname,
    })
})

export default router
