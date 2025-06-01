import { AuthorizationStatus, deleteToken, getMessaging, getToken, onTokenRefresh, requestPermission } from '@react-native-firebase/messaging'
import { getUniqueId } from 'react-native-device-info'
import { Platform } from 'react-native'
import { INotificationToken, PlatformType } from '@fienmee/types/api/notification'
import notifee from '@notifee/react-native'

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
        return await getToken(this.messaging)
    }

    async getDeviceInfo(): Promise<INotificationToken> {
        const hasPermission = await this.requestPermission()
        if (!hasPermission) {
            throw new Error('Notification permission denied')
        }
        const token = await this.getFcmToken()
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

    setMessageHandler() {
        this.messaging.setBackgroundMessageHandler(async remoteMessage => {
            console.log('Background message received: ', JSON.stringify(remoteMessage))
        })
        this.messaging.onMessage(async remoteMessage => {
            const { title, body } = remoteMessage.notification ?? {}
            await notifee.displayNotification({
                title,
                body,
                android: {
                    channelId: 'default',
                    smallIcon: 'ic_launcher', // TODO: add logo img in android/app/src/main/res/drawable
                    pressAction: {
                        id: 'default',
                        launchActivity: 'default',
                    },
                },
            })
        })
    }
}

export default new PushNotificationService()
