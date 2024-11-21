export class APIError extends Error {
    statusCode: number
    errorCode: number
    message: string
    cause: Error | string

    constructor(statusCode: number, errorCode: number, message: string, cause: Error | string = null) {
        super(message)

        this.statusCode = statusCode
        this.errorCode = errorCode
        this.message = message
        this.cause = cause
    }

    toJSON() {
        return {
            status: this.statusCode,
            code: this.errorCode,
            message: this.message,
            stack: this.stack,
            cause: this.cause,
        }
    }
}
