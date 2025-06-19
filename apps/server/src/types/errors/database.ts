import { APIError } from '@/types/errors/error'

export class TransactionError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 8000, 'transcation error', cause)
        Object.setPrototypeOf(this, TransactionError.prototype)
        Error.captureStackTrace(this, TransactionError)
    }
}
