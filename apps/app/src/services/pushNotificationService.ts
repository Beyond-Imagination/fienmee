import { AuthorizationStatus, deleteToken, getMessaging, getToken, onTokenRefresh, requestPermission } from '@react-native-firebase/messaging'
import { getUniqueId } from 'react-native-device-info'
import { Alert, Platform } from 'react-native'
import { INotificationToken, PlatformType } from '@fienmee/types/api/notification'

class PushNotificationService {
    private messaging = getMessaging()
    public token = ''
    public deviceId = ''
    public platform: PlatformType = PlatformType.IOS

    async requestPermission(): Promise<boolean> {
        try {
            const authStatus = await requestPermission(this.messaging)
            return authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL
        } catch (error) {
            throw error // TODO: 권한 요청 실패 시 처리 로직 필요
        }
    }

    async getFcmToken(): Promise<string> {
        return await getToken(this.messaging)
    }

    async getDeviceInfo(): Promise<INotificationToken> {
        const hasPermission = await this.requestPermission()
        if (!hasPermission) {
            throw new Error('Notification permission denied')
        }
        this.token = await this.getFcmToken()
        this.deviceId = await getUniqueId()
        this.platform = Platform.OS === 'ios' ? PlatformType.IOS : PlatformType.ANDROID
        return {
            token: this.token,
            deviceId: this.deviceId,
            platform: this.platform,
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
