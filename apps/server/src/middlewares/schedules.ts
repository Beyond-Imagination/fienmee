import { NextFunction, Request, Response } from 'express'
import { ScheduleModel } from '@/models/schedule'
import { UnAuthorizedSchedule } from '@/types/errors/schedule'

export const verifyAuthorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = (await ScheduleModel.findOne({ _id: req.params.id }).exec())?.authorId
    if (!authorId) {
        throw new UnAuthorizedSchedule(new Error('not found target schedule'))
    }
    if (req.user?._id !== authorId) {
        throw new UnAuthorizedSchedule()
    }
    next()
}
