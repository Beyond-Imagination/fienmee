export interface IBridgeData {
    type: string
}

export interface IJWTData extends IBridgeData {
    type: 'jwt'
    jwt: string
}

export interface IBackButtonData extends IBridgeData {
    type: 'backButton'
}

export interface ILogoutData extends IBridgeData {
    type: 'logout'
}
