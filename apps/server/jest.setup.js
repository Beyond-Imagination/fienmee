/* eslint-env jest */

jest.mock('firebase-admin', () => ({
    initializeApp: jest.fn(),
    credential: {
        cert: jest.fn(),
    },
    messaging: jest.fn(() => ({
        send: jest.fn(),
    })),
}))
