import { config } from 'dotenv'

config()

export const { NODE_ENV } = process.env

export const PORT = Number.parseInt(process.env.PORT) || 5000
