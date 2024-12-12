import { config } from 'dotenv'

config()

export const { NODE_ENV, DB_URI, DB_NAME, JWT_PRIVATE_KEY } = process.env

export const PORT = Number.parseInt(process.env.PORT) || 5000
