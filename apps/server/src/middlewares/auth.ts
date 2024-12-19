import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { JWT_SECRET } from '@/config'
import { MissingTokenError, UnauthorizedTokenError } from '@/types/errors/jwt/auth'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')?.[1]
    if (!token) {
        throw new MissingTokenError(new Error('check the "authorization" header field'))
    }

    jwt.verify(token, JWT_SECRET, { issuer: 'FIENMEE' }, (err, decoded) => {
        if (err) {
            throw new UnauthorizedTokenError(err)
        }
        req.user = decoded.user
        next()
    })
}
