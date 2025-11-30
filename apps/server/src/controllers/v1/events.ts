import express, { Request, Response, Router } from 'express'
import asyncify from 'express-asyncify'
import { bindingCargo, getCargo } from 'express-cargo'
import mongoose from 'mongoose'
import { CategoryCode, NotificationType } from '@fienmee/types'

import { CategoryModel, Events, EventsModel, ReviewsModel, CommentsModel, NotificationModel } from '@/models'
import { verifyToken } from '@/middlewares/auth'
import { verifyCommentAuthor, verifyEventAuthor } from '@/middlewares/events'
import { TransactionError } from '@/types/errors/database'
import { CommentNotFound, EventNotFound, InvaildDate, KeywordIsEmptyToSearch } from '@/types/errors/events'
import {
    EventCommentIdPayload,
    EventIdPayload,
    GetEventCategoryPayload,
    GetEventCommentPayload,
    GetEventDateCategoryPayload,
    GetEventHotCategoryPayload,
    GetEventInterestCategoryPayload,
    GetEventReviewPayload,
    GetEventSearchPayload,
    PostEventCommentPayload,
    PostEventPayload,
    PostEventReviewPayload,
    PutEventCommentPayload,
    PutEventPayload,
} from '@/types/payload'

const router: Router = asyncify(express.Router())

router.post('/category/initialize', async (req: Request, res: Response) => {
    await CategoryModel.initialize()
    res.sendStatus(204)
})

router.get('/categories', verifyToken, async (req: Request, res: Response) => {
    let categories = await CategoryModel.getCategoriesByType('normal')
    const defaultCategories = await CategoryModel.getCategoriesByType('special')
    categories = categories.filter(normal => !req.user.interests.some(interest => interest._id === normal._id))
    res.status(200).json({
        favoriteCategories: req.user.interests,
        categories: categories,
        defaultCategories: defaultCategories,
    })
})

router.post('/', verifyToken, bindingCargo(PostEventPayload), async (req: Request, res: Response) => {
    const cargo = getCargo<PostEventPayload>(req)

    await EventsModel.create({
        ...cargo,
        authorId: req.user._id,
    })
    res.sendStatus(204)
})

router.get('/search', bindingCargo(GetEventSearchPayload), async (req: Request, res: Response) => {
    const { q, category, target, sort, startDate, endDate, isAllDay, limit, skip } = getCargo<GetEventSearchPayload>(req)

    const pathMap: Record<string, string[]> = {
        default: ['name', 'description'],
        name: ['name'],
        address: ['address'],
    }

    const path = pathMap[target]

    if (!q) {
        throw new KeywordIsEmptyToSearch()
    }

    const query: mongoose.PipelineStage[] = [
        {
            $search: {
                index: 'korean_events_search',
                text: {
                    query: q,
                    path: path,
                },
            },
        },
        { $skip: skip },
        { $limit: limit },
    ]

    if (category) {
        query.push({
            $match: { category },
        })
    }

    if (endDate && startDate > endDate) {
        throw new InvaildDate()
    } else {
        const dateMap: mongoose.FilterQuery<Date> = {}
        if (startDate) {
            dateMap.startDate = { $gte: startDate }
        }
        if (endDate) {
            dateMap.endDate = { $lte: endDate }
        }
        query.push({
            $match: dateMap,
        })
    }

    if (isAllDay) {
        query.push({
            $match: { isAllDay: isAllDay },
        })
    }

    if (sort === 'default') query.push({ $sort: { popularity: -1 } })
    else if (sort === 'hot') query.push({ $sort: { likes: -1 } })
    else if (sort === 'startDate') query.push({ $sort: { startDate: -1 } })
    else if (sort === 'endDate') query.push({ $sort: { endDate: -1 } })

    const result = await EventsModel.aggregate(query)

    res.status(200).json(result)
})

router.put('/:id', verifyToken, bindingCargo(PutEventPayload), verifyEventAuthor, async (req: Request, res: Response) => {
    const { id, ...updateData } = getCargo<PutEventPayload>(req)
    const event = await EventsModel.findOneAndUpdate(
        { _id: id },
        updateData,
        { returnDocument: 'after' },
    )
    res.status(200).json({
        ...event.toJSON(),
        isAuthor: event.get('authorId')?.equals(req.user._id),
        isLiked: event.get('likes')?.includes(req.user._id),
    })
})

router.delete('/:id', verifyToken, bindingCargo(EventIdPayload), verifyEventAuthor, async (req: Request, res: Response) => {
    const { id } = getCargo<EventIdPayload>(req)
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        await EventsModel.deleteOne({ _id: id }, { session })
        await CommentsModel.deleteMany({ eventId: id }, { session })
        await session.commitTransaction()
        res.sendStatus(204)
    } catch (error) {
        await session.abortTransaction()
        throw new TransactionError(error)
    } finally {
        await session.endSession()
    }
})

router.get('/:id', verifyToken, bindingCargo(EventIdPayload), async (req: Request, res: Response) => {
    const { id } = getCargo<EventIdPayload>(req)
    const event = await EventsModel.findById(id)

    res.status(200).json({
        ...event.toJSON(),
        isAuthor: event.get('authorId')?.equals(req.user._id),
        isLiked: event.get('likes')?.includes(req.user._id),
    })
})

router.post('/:id/comments', verifyToken, bindingCargo(PostEventCommentPayload), async (req: Request, res: Response) => {
    const cargo = getCargo<PostEventCommentPayload>(req)
    const comment = await CommentsModel.create({
        userId: req.user._id,
        eventId: cargo.id,
        comment: cargo.comment,
    })

    const event = await EventsModel.findByIdAndUpdate(cargo.id, { $push: { comments: comment._id } })
    if (event.authorId && !event.authorId.equals(req.user._id)) {
        await NotificationModel.createAndSendNotification(
            NotificationType.COMMENT,
            event.authorId,
            '내가 등록한 행사에 새로운 댓글이 작성됐어요!',
            `${event.name} 행사에 새로운 댓글이 작성됐어요!`,
            `events:detail:${event._id}`,
        )
    }

    res.sendStatus(204)
})

router.get('/:id/comments', verifyToken, bindingCargo(GetEventCommentPayload), async (req: Request, res: Response) => {
    const { id, page, limit } = getCargo<GetEventCommentPayload>(req)
    const result = await CommentsModel.findByEventId(id, { page, limit })
    const modifiedDocs = result.docs.map(comment => ({
        ...comment.toObject(),
        isAuthor: comment.get('userId')?.equals(req.user._id),
        isLiked: comment.get('likes')?.includes(req.user._id),
        likeCount: comment.get('likes')?.length || 0,
    }))
    res.status(200).json({
        comments: modifiedDocs,
        page: {
            totalDocs: result.totalDocs,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            page: result.page,
            limit: result.limit,
        },
    })
})

router.put(
    '/:id/comments/:commentId',
    verifyToken,
    bindingCargo(PutEventCommentPayload),
    verifyCommentAuthor,
    async (req: Request, res: Response) => {
        const { commentId, comment } = getCargo<PutEventCommentPayload>(req)
        await CommentsModel.updateOne({ _id: commentId }, { comment })
        res.sendStatus(204)
    },
)

router.delete(
    '/:id/comments/:commentId',
    verifyToken,
    bindingCargo(EventCommentIdPayload),
    verifyCommentAuthor,
    async (req: Request, res: Response) => {
        const { id, commentId } = getCargo<EventCommentIdPayload>(req)
        const session = await mongoose.startSession()
        try {
            session.startTransaction()
            await CommentsModel.deleteOne({ _id: commentId }, { session })
            await EventsModel.updateOne({ _id: id }, { $pull: { comments: new mongoose.Types.ObjectId(commentId) } }, { session })
            await session.commitTransaction()
            res.sendStatus(204)
        } catch (error) {
            await session.abortTransaction()
            throw new TransactionError(error)
        } finally {
            await session.endSession()
        }
    },
)

router.post('/:id/comments/:commentId/likes', verifyToken, bindingCargo(EventCommentIdPayload), async (req: Request, res: Response) => {
    const { id, commentId } = getCargo<EventCommentIdPayload>(req)
    const comment = await CommentsModel.findById(commentId).populate<{ eventId: { name: string } }>({ path: 'eventId', select: 'name' })

    if (!comment) {
        throw new CommentNotFound()
    }
    const prevLiked = comment.likes.includes(req.user._id)
    const updateLiked = prevLiked ? { $pull: { likes: req.user._id } } : { $push: { likes: req.user._id } }

    await CommentsModel.updateOne({ _id: commentId }, updateLiked)
    if (comment.userId && !prevLiked && !comment.userId.equals(req.user._id)) {
        await NotificationModel.createAndSendNotification(
            NotificationType.LIKE,
            comment.userId,
            '누군가가 내가 등록한 댓글에 좋아요를 눌렀어요!',
            `${comment.eventId.name} 행사 댓글에 좋아요가 눌렸어요!`,
            `events:detail:${id}`,
        )
    }

    res.sendStatus(204)
})

router.post('/:id/likes', verifyToken, bindingCargo(EventIdPayload), async (req: Request, res: Response) => {
    const { id } = getCargo<EventIdPayload>(req)
    const event = await EventsModel.findById(id)
    const userId = req.user._id

    const prevLiked = event.likes.includes(userId)
    const update = prevLiked ? { $pull: { likes: userId } } : { $push: { likes: userId } }

    await EventsModel.updateOne({ _id: id }, update)
    if (event.authorId && !prevLiked && !event.authorId.equals(userId)) {
        await NotificationModel.createAndSendNotification(
            NotificationType.LIKE,
            event.authorId,
            '누군가가 내가 등록한 행사에 좋아요를 눌렀어요!',
            `${event.name} 행사에 좋아요가 눌렸어요!`,
            `events:detail:${event._id}`,
        )
    }

    res.sendStatus(204)
})

router.post('/:id/reviews', verifyToken, bindingCargo(PostEventReviewPayload), async (req: Request, res: Response) => {
    const { id, rating, photo, body } = getCargo<PostEventReviewPayload>(req)
    const event = await EventsModel.findById(id)
    const review = await ReviewsModel.create({
        eventId: event._id,
        userId: req.user._id,
        rating,
        photo,
        body,
    })

    if (event.authorId && !event.authorId.equals(req.user._id)) {
        await NotificationModel.createAndSendNotification(
            NotificationType.REVIEW,
            event.authorId,
            '내가 등록한 행사에 새로운 리뷰가 작성됐어요!',
            `${event.name} 행사에 새로운 리뷰가 작성됐어요!`,
            `events:review:${event._id}`,
        )
    }
    res.status(200).json({
        reviewId: review._id,
    })
})

router.get('/:id/reviews', verifyToken, bindingCargo(GetEventReviewPayload), async (req: Request, res: Response) => {
    const { id, page, limit } = getCargo<GetEventReviewPayload>(req)

    const event = await EventsModel.findById(id)
    if (!event) {
        throw new EventNotFound()
    }
    const options = { sort: { createdAt: -1 }, page: page, limit: limit }
    const result = await ReviewsModel.findByEventId(event._id, options)
    res.status(200).json({
        reviews: result.docs,
        page: {
            totalDocs: result.totalDocs,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            page: result.page,
            limit: result.limit,
        },
    })
})

router.get('/category/dates', verifyToken, bindingCargo(GetEventDateCategoryPayload), async (req: Request, res: Response) => {
    const { from: fromString, to: toString, limit, page } = getCargo<GetEventDateCategoryPayload>(req)
    const today = new Date()
    const from = fromString ?? new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const to = toString ?? new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    const result = await EventsModel.findByDates(from, to, limit, page)
    const events = result.docs.map(event => ({
        ...event.toJSON(),
        isAuthor: event.get('authorId')?.equals(req.user._id),
        isLiked: event.get('likes')?.includes(req.user._id),
    }))

    res.status(200).json({ events: events })
})

router.get('/category/interest', verifyToken, bindingCargo(GetEventInterestCategoryPayload), async (req: Request, res: Response) => {
    const { limit, page } = getCargo<GetEventInterestCategoryPayload>(req)
    const interests = req.user.interests as unknown as string[]

    if (interests.length === 0) {
        res.status(200).json({ events: [] })
        return
    }

    const options = { sort: { startDate: 1, endDate: 1, createdAt: -1 }, page, limit }
    const result = await EventsModel.findByCategory(interests, options)

    const events = result.docs.map(event => ({
        ...event.toJSON(),
        isAuthor: event.get('authorId')?.equals(req.user._id),
        isLiked: event.get('likes')?.includes(req.user._id),
    }))

    res.status(200).json({
        events: events,
        page: {
            totalDocs: result.totalDocs,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            page: result.page,
            limit: result.limit,
        },
    })
})

router.get(`/category/${CategoryCode.HOTEVENT}`, verifyToken, bindingCargo(GetEventHotCategoryPayload), async (req: Request, res: Response) => {
    const { from: fromString, to: toString, limit, page } = getCargo<GetEventDateCategoryPayload>(req)
    const today = new Date()
    const from = fromString ?? new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const to = toString ?? new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    const result = await EventsModel.findHot(from, to, limit, page)
    const events = result.docs.map(event => ({
        ...event,
        isAuthor: event['authorId']?.equals(req.user._id),
        isLiked: event['likes']?.includes(req.user._id),
    }))

    res.status(200).json({
        events: events,
        page: {
            totalDocs: result.totalDocs,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            page: result.page,
            limit: result.limit,
        },
    })
})

router.get('/category/:category', verifyToken, bindingCargo(GetEventCategoryPayload), async (req: Request, res: Response) => {
    const { category, limit, page } = getCargo<GetEventCategoryPayload>(req)
    const options = { sort: { startDate: 1, endDate: 1, createdAt: -1 }, page, limit }

    let result: mongoose.PaginateResult<mongoose.PaginateDocument<typeof Events, object, object, mongoose.PaginateOptions>>
    if (category === CategoryCode.MYEVENT) {
        result = await EventsModel.findByAuthor(req.user._id, options)
    } else {
        result = await EventsModel.findByCategory([category], options)
    }
    const events = result.docs.map(event => ({
        ...event.toJSON(),
        isAuthor: event.get('authorId')?.equals(req.user._id),
        isLiked: event.get('likes')?.includes(req.user._id),
    }))

    res.status(200).json({
        events: events,
        page: {
            totalDocs: result.totalDocs,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            page: result.page,
            limit: result.limit,
        },
    })
})

export default router
