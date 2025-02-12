import { config } from 'dotenv'

config()

export const { NODE_ENV, HOST, DB_URI, DB_NAME, JWT_SECRET, SEOUL_API_KEY, SEOUL_API_URL } = process.env

export const PORT = Number.parseInt(process.env.PORT) || 5000
export const ACCESS_TOKEN_EXPIRES_IN_MS = Number.parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN_MS) || 1000 * 60 * 30
export const REFRESH_TOKEN_EXPIRES_IN_MS = Number.parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_MS) || 1000 * 60 * 60 * 24 * 60
