export enum PlatformType {
    IOS = 0,
    ANDROID,
}

export enum NotificationType {
    COMMENT = 0,
    LIKE,
    REVIEW,
}

export interface NotificationToken {
    token: string
    deviceId: string
    platform: PlatformType
}
