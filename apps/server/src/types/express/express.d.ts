import mongoose from 'mongoose'

declare global {
    namespace Express {
        interface User {
            _id: mongoose.Types.ObjectId
            nickname: string
            provider: string
            providerId: string
        }
        interface Request {
            user?: User
            isAuthenticated(): boolean
            logout(callback?: (err?: Error) => void): void
        }
    }
}
