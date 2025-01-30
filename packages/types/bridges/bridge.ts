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

export function isLogoutData(data: unknown): data is ILogoutData {
    return typeof data === 'object' && data !== null && 'type' in data && data.type === 'logout'
}
