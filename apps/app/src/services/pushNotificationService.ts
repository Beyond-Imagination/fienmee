import { AuthorizationStatus, deleteToken, getMessaging, getToken, onTokenRefresh, requestPermission } from '@react-native-firebase/messaging'
import { getUniqueId } from 'react-native-device-info'
import { Platform, Alert } from 'react-native'
import { NotificationToken, PlatformType } from '@fienmee/types/api/notification'

class PushNotificationService {
    private messaging = getMessaging()

    async requestPermission(): Promise<boolean> {
        try {
            const authStatus = await requestPermission(this.messaging)
            return authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL
        } catch (error) {
            throw error // TODO: 권한 요청 실패 시 처리 로직 필요
        }
    }

    async getFcmToken(): Promise<string> {
        try {
            return await getToken(this.messaging)
        } catch (error) {
            throw error
        }
    }

    async getDeviceInfo(): Promise<NotificationToken> {
        const hasPermission = await this.requestPermission()
        if (!hasPermission) {
            // TODO: 푸시메시지 권한 없음. 권한 요청 필요
            throw new Error('Notification permission denied')
        }
        const token = await this.getFcmToken()
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
