/* eslint-env jest */

// react-native-firebase/app 네이티브 모듈 Mock
jest.mock('@react-native-firebase/app', () => ({
    initializeApp: jest.fn(),
    RNFBNativeEventEmitter: jest.fn(),
}))

// react-native-firebase/messaging 네이티브 모듈 Mock
jest.mock('@react-native-firebase/messaging', () => ({
    requestPermissions: jest.fn().mockResolvedValue(true),
    getToken: jest.fn().mockResolvedValue('mock-token'),
    deleteToken: jest.fn().mockResolvedValue(),
    onTokenRefresh: jest.fn(() => ({})),
    getMessaging: jest.fn(() => ({
        setBackgroundMessageHandler: jest.fn(),
        onMessage: jest.fn(),
    })),
    AuthorizationStatus: {
        AUTHORIZED: 1,
        NOT_DETERMINED: 0,
        DENIED: 2,
    },
}))

// react-native-device-info 네이티브 모듈 Mock
jest.mock('react-native-device-info', () => ({
    getUniqueId: jest.fn().mockResolvedValue('mock-unique-id'),
}))

// @notifee/react-native 네이티브 모듈 Mock
jest.mock('@notifee/react-native', () => ({
    default: {
        requestPermissions: jest.fn().mockResolvedValue({}),
        createChannel: jest.fn().mockResolvedValue(undefined),
        displayNotification: jest.fn().mockResolvedValue('mock-channel-id'),
    },
}))
