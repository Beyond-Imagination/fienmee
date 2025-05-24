import { AuthorizationStatus, deleteToken, getMessaging, getToken, onTokenRefresh, requestPermission } from '@react-native-firebase/messaging'
import { getUniqueId } from 'react-native-device-info'
import { Platform, Alert } from 'react-native'
import { NotificationToken, PlatformType } from '@fienmee/types/api/notification.ts'

class PushNotificationService {
    private messaging = getMessaging()

    async requestPermission(): Promise<boolean> {
        const authStatus = await requestPermission(this.messaging)
        return authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL
    }

    async getFcmToken(): Promise<string | null> {
        try {
            return await getToken(this.messaging)
        } catch (e) {
            console.log('FCM token error', e)
            return null
        }
    }

    async getDeviceInfo(): Promise<NotificationToken | null> {
        const hasPermission = await this.requestPermission()
        if (!hasPermission) return null

        const token = await this.getFcmToken()
        if (!token) return null
        const deviceId = await getUniqueId()
        const platform: PlatformType = Platform.OS === 'ios' ? PlatformType.IOS : PlatformType.ANDROID

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

    setMessageHandler() {
        this.messaging.setBackgroundMessageHandler(async remoteMessage => {
            console.log('Background message received: ', JSON.stringify(remoteMessage))
        })
        this.messaging.onMessage(async remoteMessage => {
            Alert.alert('Foreground message received:', JSON.stringify(remoteMessage))
            // TODO: 알림 메시지 띄우기
        })
    }
}

export default new PushNotificationService()
