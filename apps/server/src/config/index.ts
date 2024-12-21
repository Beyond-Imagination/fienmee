import { config } from 'dotenv'

config()

export const { NODE_ENV, DB_URI, DB_NAME, JWT_SECRET, SEOUL_API_KEY, SEOUL_API_URL } = process.env

export const PORT = Number.parseInt(process.env.PORT) || 5000
