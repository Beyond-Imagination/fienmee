import mongoose from 'mongoose'
import { defaultClasses, getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'
import { messaging } from 'firebase-admin'

import { User } from '@/models/user'
import { NotificationTokenModel } from '@/models/notificaionToken'
import { NotificationType } from '@fienmee/types/api/notification'
import { logger } from '@/utils/logger'
import { FCMMulticastSendError } from '@/types/errors/notification'

export class Notification extends defaultClasses.TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true, ref: User })
    public userId: mongoose.Types.ObjectId

    @prop({ required: true, enum: Object.values(NotificationType).filter(v => typeof v === 'number') })
    public type: number

    @prop({ required: true })
    public title: string

    @prop({ required: true })
    public body: string

    @prop()
    public navigate: string

    @prop({ required: true, default: false })
    public isRead: boolean

    public toJSON() {
        return {
            _id: this._id,
            userId: this.userId,
            type: this.type,
            title: this.title,
            body: this.body,
            navigate: this.navigate,
            isRead: this.isRead,
            createdAt: this.createdAt,
        }
    }

    public static async createAndSendNotification(
        this: ReturnModelType<typeof Notification>,
        type: NotificationType,
        userId: mongoose.Types.ObjectId,
        title: string,
        body: string,
        navigate: string,
    ): Promise<void> {
        const notification = await this.create({
            userId: userId,
            type: type,
            title: title,
            body: body,
            navigate: navigate,
        })
        const tokens = await NotificationTokenModel.find({ userId: userId }).exec()
        if (tokens.length === 0) {
            return
        }

        const message: messaging.MulticastMessage = {
            notification: {
                title: notification.title,
                body: notification.body,
            },
            data: {
                userId: userId.toHexString(),
                type: NotificationType[notification.type],
                navigate: notification.navigate,
                createdAt: notification.createdAt.toISOString(),
            },
            tokens: tokens.map(t => t.token),
        }

        try {
            const result = await messaging().sendEachForMulticast(message)
            logger.info(`'Successfully sent message to multiple tokens: ${result.successCount} succeeded, ${result.failureCount} failed.`)
            if (result.failureCount > 0) {
                result.responses.forEach((res, idx) => {
                    if (!res.success) {
                        NotificationTokenModel.deleteOne({ _id: tokens[idx]._id }) // 전송 실패한 경우는 토큰이 유효하지 않거나 기기에서 앱이 제거된 경우
                    }
                })
            }
        } catch (error) {
            throw new FCMMulticastSendError(error)
        }
    }
}

export const NotificationModel = getModelForClass(Notification)
