import jwt from 'jsonwebtoken'

import { User } from '@/models/user'
import { JWT_SECRET } from '@/config'

export function issueJwt(user: User): string {
    return jwt.sign({ issuer: 'FIENMEE', userId: user._id }, JWT_SECRET, { expiresIn: '30m' })
}
