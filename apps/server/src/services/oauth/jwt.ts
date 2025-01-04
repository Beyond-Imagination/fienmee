import jwt from 'jsonwebtoken'

import { User } from '@/models/user'
import { JWT_EXPIRES_IN_MS, JWT_SECRET } from '@/config'
import { ITokenInfo } from '@/types/oauth'
import { addToBlackList } from '@/utils/blacklist'

export function issueJwt(user: User): string {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN_MS / 1000 })
}

export function expireJwt(tokenInfo: ITokenInfo) {
    addToBlackList(tokenInfo)
}
