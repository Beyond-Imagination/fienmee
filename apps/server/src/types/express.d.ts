import { User } from '@/models'
import { IJwtPayload } from '@/types/oauth'

declare global {
    namespace Express {
        interface Request {
            _routeWhitelists: { body: string[] }
            _routeBlacklists: { body: string[] }
            user: User
            jwtPayload: IJwtPayload
        }
        interface Response {
            meta: {
                error?: Error
            }
        }
    }
}
