import { PassportStatic } from 'passport'
import { Strategy as KakaoStrategy } from 'passport-kakao'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import config from '@/config'
import { findOrCreateUser } from '../services/v1/auth'
import { User } from '@/models/user'
import { GoogleProfile, KakaoProfile } from '@/types/oauth.profile'
import { findUserById } from '@/services/v1/user'

export default function configurePassport(passport: PassportStatic): void {
    passport.serializeUser((user: User, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await findUserById(id)
            done(null, user)
        } catch (err) {
            done(err, null)
        }
    })

    passport.use(
        'kakao',
        new KakaoStrategy(
            {
                clientID: config.kakao.clientId,
                clientSecret: config.kakao.clientSecret,
                callbackURL: config.kakao.redirectUri,
            },
            async (_accessToken: string, _refreshToken: string, profile: KakaoProfile, done) => {
                try {
                    const user: User = await findOrCreateUser('kakao', profile)
                    return done(null, user)
                } catch (error) {
                    return done(error, null)
                }
            },
        ),
    )

    passport.use(
        'google',
        new GoogleStrategy(
            {
                clientID: config.google.clientId,
                clientSecret: config.google.clientSecret,
                callbackURL: config.google.redirectUri,
            },
            async (_accessToken: string, _refreshToken: string, profile: GoogleProfile, done) => {
                try {
                    const user: User = await findOrCreateUser('google', profile)
                    return done(null, user)
                } catch (error) {
                    return done(error, null)
                }
            },
        ),
    )
}
