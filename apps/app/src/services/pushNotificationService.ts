import {
    AuthorizationStatus,
    deleteToken,
    FirebaseMessagingTypes,
    getMessaging,
    getToken,
    onTokenRefresh,
    requestPermission,
} from '@react-native-firebase/messaging'
import { getUniqueId } from 'react-native-device-info'
import { Platform } from 'react-native'
import { INotificationToken, PlatformType } from '@fienmee/types/api/notification'

class PushNotificationService {
    private messaging = getMessaging()

    async requestPermission(): Promise<boolean> {
        try {
            const authStatus = await requestPermission(this.messaging)
            return authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL
        } catch (error) {
            console.error('Failed to request notification permission:', error)
            return false
        }
    }

    async getFcmToken(): Promise<string | null> {
        try {
            return await getToken(this.messaging)
        } catch (error) {
            console.error('Failed to get FCM token: ', error)
            return null
        }
    }

    async getDeviceInfo(): Promise<INotificationToken> {
        const hasPermission = await this.requestPermission()
        if (!hasPermission) {
            throw new Error('Notification permission denied')
        }
        const token = await this.getFcmToken()
        if (!token) {
            throw new Error('FCM token is not available')
        }
        const deviceId = await getUniqueId()
        const platform = Platform.OS === 'ios' ? PlatformType.IOS : PlatformType.ANDROID
        return {
            token,
            deviceId,
            platform,
        }
    }

    async deleteFcmToken(): Promise<void> {
        await deleteToken(this.messaging)
    }

    listenRefreshToken(callback: (token: string) => void) {
        return onTokenRefresh(this.messaging, callback)
    }

    setMessageHandler(
        backgroundHandler: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<any>,
        foregroundHandler: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<any>,
    ) {
        this.messaging.setBackgroundMessageHandler(backgroundHandler)
        this.messaging.onMessage(foregroundHandler)
    }
}

export default new PushNotificationService()
