import { NextFunction, Request, Response } from 'express'
import { CommentsModel } from '@/models'
import { UnauthorizedComment } from '@/types/errors/events'

export const verifyCommentAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = (await CommentsModel.findOne({ _id: req.params.commentId }).exec())?.userId
    if (!req.user?._id.equals(authorId)) {
        throw new UnauthorizedComment()
    }
    next()
}
