import { config } from 'dotenv'
import AWS from 'aws-sdk'

config()

export const {
    NODE_ENV,
    HOST,
    DB_URI,
    DB_NAME,
    JWT_SECRET,
    SEOUL_API_KEY,
    SEOUL_API_URL,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_S3_BUCKET,
} = process.env

export const PORT = Number.parseInt(process.env.PORT) || 5000
export const ACCESS_TOKEN_EXPIRES_IN = Number.parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN) || 60 * 30
export const REFRESH_TOKEN_EXPIRES_IN = Number.parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN) || 60 * 60 * 24 * 60

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
})
