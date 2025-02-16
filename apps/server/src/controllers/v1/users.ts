import asyncify from 'express-asyncify'
import express, { Request, Response, Router } from 'express'

import { loginRequest, loginResponse, refreshResponse, registerRequest, registerResponse } from '@fienmee/types'

import { DeletedUserError, UnknownUserError } from '@/types/errors/oauth'
import { InvalidTokenTypeError } from '@/types/errors'
import { UserModel } from '@/models'
import { issueAccessToken, getOAuthUser, expireJwt, issueRefreshToken, unlinkUser } from '@/services/oauth'
import { verifyToken } from '@/middlewares/auth'
import { registerUser } from '@/services/user'

const router: Router = asyncify(express.Router())

router.post('/login', async (req: Request, res: Response) => {
    const request: loginRequest = req.body

    const oauthUser = await getOAuthUser(request)
    const user = await UserModel.findByProviderId(oauthUser.providerId)
    if (!user) {
        throw new UnknownUserError(new Error(`not found ${oauthUser.providerId}`))
    }

    if (user.isDeleted) {
        throw new DeletedUserError(new Error('This user account has been deleted.'))
    }

    const accessToken = issueAccessToken(user)
    const refreshToken = issueRefreshToken(user)
    await UserModel.updateLogIn(user)

    res.status(200).json({
        ...accessToken,
        ...refreshToken,
    } as loginResponse)
})

router.delete('/logout', async (req: Request, res: Response) => {
    const jwt = req.headers['authorization']?.split(' ')?.[1]
    expireJwt(jwt)
    res.sendStatus(204)
})

router.post('/register', async (req: Request, res: Response) => {
    const request: registerRequest = req.body
    console.log(request)
    const oauthUser = await getOAuthUser(request)

    const user = await registerUser(oauthUser)

    const accessToken = issueAccessToken(user)
    const refreshToken = issueRefreshToken(user)

    res.status(200).json({
        ...accessToken,
        ...refreshToken,
    } as registerResponse)
})

router.get('/', verifyToken, async (req: Request, res: Response) => {
    res.status(200).json({
        id: req.user._id,
        nickname: req.user.nickname,
    })
})

router.post('/refresh', verifyToken, async (req: Request, res: Response) => {
    if (req.jwtPayload.type !== 'refresh_token') {
        throw new InvalidTokenTypeError()
    }

    const response: refreshResponse = {
        ...issueAccessToken(req.user),
    }

    const diff = new Date(req.jwtPayload.expiresAt).getTime() - new Date().getTime()
    if (diff < 60 * 60 * 24 * 1000) {
        const refreshToken = issueRefreshToken(req.user)
        response.refreshToken = refreshToken.refreshToken
        response.refreshTokenExpiresAt = refreshToken.refreshTokenExpiresAt
    }

    res.status(200).json(response)
})

router.delete('/', verifyToken, async (req: Request, res: Response) => {
    const jwt = req.headers['authorization']?.split(' ')?.[1]

    await unlinkUser(req.user)
    expireJwt(jwt)

    res.sendStatus(204)
})

export default router
