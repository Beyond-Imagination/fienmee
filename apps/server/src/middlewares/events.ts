import { NextFunction, Request, Response } from 'express'
import { CommentsModel } from '@/models'
import { CommentNotFound, UnauthorizedComment } from '@/types/errors/events'

export const verifyCommentAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const comment = await CommentsModel.findOne({ _id: req.params.commentId })
    if (!comment) throw new CommentNotFound()
    const authorId = comment.userId
    if (!req.user?._id.equals(authorId)) {
        throw new UnauthorizedComment()
    }
    next()
}
