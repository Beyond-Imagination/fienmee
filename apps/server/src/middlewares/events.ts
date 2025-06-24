import { NextFunction, Request, Response } from 'express'

import { CommentsModel, EventsModel } from '@/models'
import { CommentNotFound, EventNotFound, UnauthorizedComment, UnauthorizedEvent } from '@/types/errors/events'

export const verifyEventAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const event = await EventsModel.findById(req.params.id).exec()
    if (!event) {
        throw new EventNotFound()
    }
    if (!event.authorId || !req.user._id.equals(event.authorId)) {
        throw new UnauthorizedEvent()
    }
    next()
}

export const verifyCommentAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const comment = await CommentsModel.findOne({ _id: req.params.commentId })
    if (!comment) throw new CommentNotFound()
    const authorId = comment.userId
    if (!req.user?._id.equals(authorId)) {
        throw new UnauthorizedComment()
    }
    next()
}
