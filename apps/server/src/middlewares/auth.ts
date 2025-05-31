import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '@/config'
import { UserModel } from '@/models'
import { UnknownUserError, UnauthorizedTokenError } from '@/types/errors'
import { IJwtPayload } from '@/types/oauth/jwt'
import { isTokenInBlackList } from '@/services/oauth'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')?.[1]

    if (!token) {
        return next(new UnauthorizedTokenError('fill the "authorization" header field'))
    }

    if (isTokenInBlackList(token)) {
        return next(new UnauthorizedTokenError('Token of logged out user'))
    }

    let jwtPayload: IJwtPayload
    try {
        jwtPayload = jwt.verify(token, JWT_SECRET) as IJwtPayload
    } catch (e) {
        return next(new UnauthorizedTokenError(e))
    }

    const user = await UserModel.findOne({ _id: jwtPayload.userId }).exec()
    if (!user) {
        return next(new UnknownUserError())
    }

    req.user = user
    req.jwtPayload = jwtPayload
    next()
}
