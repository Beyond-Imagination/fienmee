export enum PlatformType {
    IOS = 0,
    ANDROID,
}

export enum NotificationType {
    COMMENT = 0,
    LIKE,
    REVIEW,
}

export interface INotificationToken {
    token: string
    deviceId: string
    platform: PlatformType
}

export interface IRequestNotificationToken {
    body: INotificationToken
    accessToken: string
}

export interface INotification {
    _id: string
    userId: string
    type: NotificationType
    title: string
    body: string
    navigate: string
    isRead: boolean
    createdAt: Date
}

export interface IGetNotificationListResponse {
    notifications: INotification[]
    page: {
        totalDocs: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        page: number
        limit: number
    }
}
