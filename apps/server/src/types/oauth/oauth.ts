export interface IOAuth {
    getUser(credential: ICredentials): Promise<IUser>
}

export interface ICredentials {
    provider: string
    accessToken: string
    refreshToken: string
}

export interface IUser extends ICredentials {
    nickname: string
    providerId: string
}
