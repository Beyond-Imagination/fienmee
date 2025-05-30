import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '@/config'
import { UserModel } from '@/models'
import { UnknownUserError, UnauthorizedTokenError } from '@/types/errors'
import { IJwtPayload } from '@/types/oauth/jwt'
import { isTokenInBlackList } from '@/services/oauth'

export const verifyToken =
    ({ required = true }: { required?: boolean } = {}) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization']?.split(' ')?.[1]
        if (!required) {
            req.user = null
            req.jwtPayload = null
        }

        if (!token) {
            if (required) {
                return next(new UnauthorizedTokenError('fill the "authorization" header field'))
            }
            return next()
        }

        if (isTokenInBlackList(token)) {
            if (required) {
                return next(new UnauthorizedTokenError('Token of logged out user'))
            }
            return next()
        }

        let jwtPayload: IJwtPayload
        try {
            jwtPayload = jwt.verify(token, JWT_SECRET) as IJwtPayload
        } catch (e) {
            if (required) {
                return next(new UnauthorizedTokenError(e))
            }
            return next()
        }

        const user = await UserModel.findOne({ _id: jwtPayload.userId }).exec()
        if (!user) {
            if (required) {
                return next(new UnknownUserError())
            }
            return next()
        }

        req.user = user
        req.jwtPayload = jwtPayload
        next()
    }
