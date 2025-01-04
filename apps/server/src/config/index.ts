import { config } from 'dotenv'

config()

export const { NODE_ENV, HOST, DB_URI, DB_NAME, JWT_SECRET, SEOUL_API_KEY, SEOUL_API_URL } = process.env

export const PORT = Number.parseInt(process.env.PORT) || 5000
export const JWT_EXPIRES_IN_MS = Number.parseInt(process.env.JWT_EXPIRES_IN_MS) || 1000 * 60 * 30
