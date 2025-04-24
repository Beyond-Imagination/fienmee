import { NextFunction, Request, Response } from 'express'
import { ScheduleModel, EventsModel, UserModel } from '@/models'
import { InvalidRequestFormat, UnauthorizedSchedule } from '@/types/errors/schedule'
import { UnknownUserError } from '@/types/errors'

export const verifyAuthorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = (await ScheduleModel.findOne({ _id: req.params.id }).exec())?.authorId
    if (!authorId) {
        throw new UnauthorizedSchedule(new Error('not found target schedule'))
    }

    if (!req.user?._id.equals(authorId)) {
        throw new UnauthorizedSchedule()
    }
    next()
}

const verifyEventId = async (req: Request, res: Response, next: NextFunction) => {
    const { eventId } = req.body
    const target = await EventsModel.findOne({ _id: eventId }).exec()
    if (!target) {
        throw new InvalidRequestFormat(new Error(`not found event => id: ${eventId}`))
    }
    next()
}

const verifyAuthorId = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?._id
    if (!authorId) {
        throw new UnknownUserError('req.user is not initialized')
    }
    const target = await UserModel.findOne({ _id: authorId }).exec()
    if (!target) {
        throw new InvalidRequestFormat(new Error(`not found author => id: ${authorId}`))
    }
    next()
}

export const addScheduleMiddleware = [verifyAuthorId, verifyEventId]
