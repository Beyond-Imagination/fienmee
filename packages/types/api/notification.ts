export enum PlatformType {
    IOS = 0,
    ANDROID,
}

export interface NotificationToken {
    token: string
    deviceId: string
    platform: PlatformType
}
