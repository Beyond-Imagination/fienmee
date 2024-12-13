import asyncify from 'express-asyncify'
import express, { Request, Response } from 'express'
import { IUserInfo, JWTProvider, OAuthPayload } from '@/utils/auth'
import { User, UserModel } from '@/models/user'
import Kakao from '@/types/provider/kakao'
import { KakaoLoginFailedException } from '@/types/errors'

const router = asyncify(express.Router())

router.post('/login', async (req: Request, res: Response) => {
    const oauthPayload: OAuthPayload = req.body

    // todo: refactor this code blocks after introducing new oauth provider
    // ==> split the code as service, and adding handler for controller logic
    if (oauthPayload.provider === 'KAKAO') {
        const userInfo: IUserInfo = await Kakao.getUserInfo(oauthPayload)
        const user: User = await UserModel.loadUser(userInfo)
        if (!user) throw new KakaoLoginFailedException(new Error(`not found ${userInfo.providerId}`))
        const jwt = JWTProvider.issueJwt(user)
        await UserModel.setProviderCredentials({
            providerId: userInfo.providerId,
            providerAccessToken: oauthPayload.accessToken,
            providerRefreshToken: oauthPayload.refreshToken,
        })
        res.status(200).json({
            accessToken: jwt,
        })
    }
})

router.post('/register', async (req: Request, res: Response) => {
    const oauthRegisterPayload: OAuthPayload = req.body

    if (oauthRegisterPayload.provider === 'KAKAO') {
        const registerInfo: IUserInfo = await Kakao.getUserInfo(oauthRegisterPayload)
        const user: User = await UserModel.createUser(registerInfo)
        const jwt = JWTProvider.issueJwt(user)
        await UserModel.setProviderCredentials({
            providerId: registerInfo.providerId,
            providerAccessToken: oauthRegisterPayload.accessToken,
            providerRefreshToken: oauthRegisterPayload.refreshToken,
        })
        res.status(200).json({
            accessToken: jwt,
        })
    }
})

export default router
