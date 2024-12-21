import { config } from 'dotenv'

config()

export const { NODE_ENV, HOST, DB_URI, DB_NAME, JWT_SECRET } = process.env

export const PORT = Number.parseInt(process.env.PORT) || 5000
