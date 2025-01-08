import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { JWT_SECRET } from '@/config'
import { UnauthorizedTokenError } from '@/types/errors/jwt/auth'
import { UserModel } from '@/models'
import { UnknownUserError } from '@/types/errors'
import { isTokenInBlackList } from '@/utils/blacklist'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')?.[1]
    if (!token) {
        next(new UnauthorizedTokenError('fill the "authorization" header field'))
    }

    if (isTokenInBlackList(token)) {
        next(new UnauthorizedTokenError('Token of logged out user'))
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await UserModel.findOne({ _id: decoded.userId }).exec()
        if (!user) {
            throw new UnknownUserError()
        }
        req.user = user
        next()
    } catch (e) {
        next(new UnauthorizedTokenError(e))
    }
}
