const GoogleSignin = {
    configure: jest.fn(),
    signIn: jest.fn().mockResolvedValue({
        data: {
            serverAuthCode: 'mock-server-auth-code',
        },
    }),
    getTokens: jest.fn().mockResolvedValue({
        idToken: 'mock-id-token',
        accessToken: 'mock-access-token',
    }),
}

export default GoogleSignin
