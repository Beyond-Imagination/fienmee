import express, { Request, Response, Router } from 'express'
import asyncify from 'express-asyncify'
import mongoose from 'mongoose'

import { CategoryModel, Events, EventsModel, ReviewsModel, CommentsModel, NotificationModel } from '@/models'
import { verifyToken } from '@/middlewares/auth'
import { CategoryCode, NotificationType } from '@fienmee/types'
import { s3 } from '@/services/aws'
import { AWS_S3_BUCKET } from '@/config'

const router: Router = asyncify(express.Router())

router.get('/s3/upload-url', async (req, res) => {
    const fileName = String(req.query.fileName)

    const params = {
        Bucket: AWS_S3_BUCKET!,
        Key: `${Date.now()}-${fileName}`,
        Expires: 3600,
    }

    const presignedUrl = await s3.getSignedUrlPromise('putObject', params)
    res.json({ presignedUrl })
})

router.get('/s3/view-url', async (req, res) => {
    const key = req.query.key as string

    const params = {
        Bucket: AWS_S3_BUCKET,
        Key: key,
        Expires: 3600,
    }

    const presignedUrl = await s3.getSignedUrlPromise('getObject', params)
    res.json({ presignedUrl })
})

router.post('/category/initialize', async (req: Request, res: Response) => {
    await CategoryModel.initialize()
    res.sendStatus(204)
})

router.get('/categories', async (req: Request, res: Response) => {
    // TODO: find user favorite categories
    const categories = await CategoryModel.getCategoriesByType('normal')
    const defaultCategories = await CategoryModel.getCategoriesByType('special')
    res.status(200).json({
        favoriteCategories: [],
        categories: categories,
        defaultCategories: defaultCategories,
    })
})

router.post('/', verifyToken, async (req: Request, res: Response) => {
    await EventsModel.create({
        name: req.body.name,
        authorId: req.user._id,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        photo: req.body.photo,
        cost: req.body.cost,
        description: req.body.description,
        category: req.body.category,
        targetAudience: req.body.targetAudience,
        isAllDay: req.body.isAllDay,
    })
    res.sendStatus(204)
})

router.put('/:id', async (req: Request, res: Response) => {
    await EventsModel.updateOne(
        { _id: req.params.id },
        {
            name: req.body.name,
            location: req.body.location,
            startDate: req.body.date,
            endDate: req.body.endDate,
            photo: req.body.photo,
            cost: req.body.cost,
            description: req.body.description,
            category: req.body.category,
            targetAudience: req.body.targetAudience,
            isAllDay: req.body.isAllDay,
        },
    )
    res.sendStatus(204)
})

router.delete('/:id', async (req: Request, res: Response) => {
    // TODO : Delete comments
    await EventsModel.deleteOne({ _id: req.params.id })
    res.sendStatus(200)
})

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
    const event = await EventsModel.findById(req.params.id)

    res.status(200).json({
        ...event.toJSON(),
        isAuthor: event.get('authorId')?.equals(req.user._id),
        isLiked: event.get('likes')?.includes(req.user._id),
    })
})

router.post('/:id/comments', verifyToken, async (req: Request, res: Response) => {
    const comment = await CommentsModel.create({
        userId: req.user._id,
        nickname: req.user.nickname,
        eventId: req.params.id,
        comment: req.body.comment,
    })

    const event = await EventsModel.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } })
    if (!event.authorId.equals(req.user._id)) {
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

router.get('/:id/comments', verifyToken, async (req: Request, res: Response) => {
    const options = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
    }
    const result = await CommentsModel.findByEventId(req.params.id, options)
    res.status(200).json({
        comments: result.docs,
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

router.post('/:id/likes', verifyToken, async (req: Request, res: Response) => {
    const event = await EventsModel.findById(req.params.id)

    const prevLiked = event.likes.includes(req.user._id)
    const update = prevLiked ? { $pull: { likes: req.user._id } } : { $push: { likes: req.user._id } }

    await EventsModel.updateOne({ _id: req.params.id }, update)
    if (!event.authorId.equals(req.user._id) && !prevLiked) {
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

router.post('/:id/reviews', verifyToken, async (req: Request, res: Response) => {
    const event = await EventsModel.findById(req.params.id)
    const review = await ReviewsModel.create({
        eventId: event._id,
        userId: req.user._id,
        rating: req.body.rating,
        photo: req.body.photo,
        body: req.body.body,
    })

    if (!event.authorId.equals(req.user._id)) {
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

router.get('/category/dates', verifyToken, async (req: Request, res: Response) => {
    const today = new Date()
    const from = req.query.from ? new Date(req.query.from as string) : new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const to = req.query.to ? new Date(req.query.to as string) : new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    const limit = req.query.limit ? Number(req.query.limit) : 0
    const page = req.query.page ? Number(req.query.page) : 1

    const result = await EventsModel.findByDates(from, to, limit, page)

    const events = result.docs.map(event => ({
        ...event.toJSON(),
        isAuthor: event.get('authorId')?.equals(req.user._id),
        isLiked: event.get('likes')?.includes(req.user._id),
    }))

    res.status(200).json({ events: events })
})

router.get('/category/:category', verifyToken, async (req: Request, res: Response) => {
    const options = { sort: { startDate: 1, endDate: 1, createdAt: -1 }, page: Number(req.query.page) || 1, limit: Number(req.query.limit) || 10 }
    const category = await CategoryModel.getCategoryById(req.params.category)

    let result: mongoose.PaginateResult<mongoose.PaginateDocument<typeof Events, object, object, mongoose.PaginateOptions>>
    if (category.code === CategoryCode.MYEVENT) {
        result = await EventsModel.findByAuthor(req.user._id, options)
    } else {
        // TODO: add get hottest events
        result = await EventsModel.findByCategory(category._id, options)
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
