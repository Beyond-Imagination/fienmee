import asyncify from 'express-asyncify'
import express, { Request, Response } from 'express'
import { IUserInfo, JWTProvider, Kakao, OAuthPayload } from '@/utils/auth'
import { User, UserModel } from '@/models/user'

const router = asyncify(express.Router())

router.post('/login', async (req: Request, res: Response) => {
    const oauthPayload: OAuthPayload = req.body

    // todo: refactor this code blocks after introducing new oauth provider
    // ==> split the code as service, and adding handler for controller logic
    if (oauthPayload.provider === 'KAKAO') {
        const userInfo: IUserInfo = await Kakao.getUserInfo(oauthPayload)
        const user: User = await UserModel.loadOrCreateUser(userInfo)
        const jwt = JWTProvider.issueJwt(user)
        res.status(200).json({
            accessToken: jwt,
        })
    }
})

export default router
