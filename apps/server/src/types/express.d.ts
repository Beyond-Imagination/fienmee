import { User } from '@/models/user'

declare global {
    namespace Express {
        interface Request {
            _routeWhitelists: { body: string[] }
            _routeBlacklists: { body: string[] }
            user: User
        }
        interface Response {
            meta: {
                error?: Error
            }
        }
    }
}
