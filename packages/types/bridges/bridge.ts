export interface IBridgeData {
    type: string
}

export interface IJWTData extends IBridgeData {
    type: 'jwt'
    jwt: string
    expiresAt: Date
}

export function isJWTData(data: unknown): data is IJWTData {
    return typeof data === 'object' && data !== null && 'type' in data && data.type === 'jwt'
}

export interface IBackButtonData extends IBridgeData {
    type: 'backButton'
}

export function isBackButtonData(data: unknown): data is IBackButtonData {
    return typeof data === 'object' && data !== null && 'type' in data && data.type === 'backButton'
}

export interface ILogoutData extends IBridgeData {
    type: 'logout'
}

export function isLogoutData(data: unknown): data is ILogoutData {
    return typeof data === 'object' && data !== null && 'type' in data && data.type === 'logout'
}

export interface IRefreshData extends IBridgeData {
    type: 'refresh'
}

export function isRefreshData(data: unknown): data is IRefreshData {
    return typeof data === 'object' && data !== null && 'type' in data && data.type === 'refresh'
}
