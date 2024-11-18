import { config } from 'dotenv'

config()

export const {
    NODE_ENV,
    DB_URI,
    DB_NAME,
    JWT_SECRET,
    KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET,
    KAKAO_CALLBACK_URI,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URI,
    SESSION_SECRET,
} = process.env

export const PORT = Number.parseInt(process.env.PORT) || 5000

export default {
    kakao: {
        clientId: process.env.KAKAO_CLIENT_ID || '',
        clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
        redirectUri: process.env.KAKAO_CALLBACK_URI || '',
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirectUri: process.env.GOOGLE_CALLBACK_URI || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
    },
    session: {
        secret: process.env.SESSION_SECRET || 'default_session_secret',
        resave: false,
        saveUninitialized: false,
    },
}
