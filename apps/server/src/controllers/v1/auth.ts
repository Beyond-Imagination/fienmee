import { AuthFailureException } from '@/exceptions/AuthFailureException'
import { LogoutFailedException } from '@/exceptions/LogoutFailedException '
import { User } from '@/models/user'
import { generateJWT } from '@/services/v1/auth'
import { Request, Response } from 'express'
import passport from 'passport'

export const authenticate = (provider: string) => {
    return passport.authenticate(provider, { scope: getScopes(provider) })
}

export const callback = (provider: string) => {
    return [
        passport.authenticate(provider, { failureRedirect: '/auth/failure' }),
        (req: Request, res: Response) => {
            const user = req.user as User
            const token = generateJWT(user)
            res.json({ token })
        },
    ]
}

export const authFailure = (req: Request, res: Response) => {
    throw new AuthFailureException()
}

export const logout = (req: Request, res: Response) => {
    req.logout()

    req.session.destroy(err => {
        if (err) {
            throw new LogoutFailedException()
        }
        res.clearCookie('connect.sid')
        res.status(200).send()
    })
}

const getScopes = (provider: string): string[] => {
    switch (provider) {
        case 'google':
            return ['profile', 'email']
        case 'kakao':
            return ['profile_nickname']
        default:
            return []
    }
}
