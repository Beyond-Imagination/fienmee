import { AuthFailureException } from '@/exceptions/AuthFailureException'
import { Request, Response, NextFunction } from 'express'

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next()
    }
    throw new AuthFailureException()
}
