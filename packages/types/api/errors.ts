export interface IErrorResponse {
    code: number
    message: string
}

export function isErrorResponse(error: unknown): error is IErrorResponse {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof (error as Record<string, unknown>).code === 'number' &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
    )
}
