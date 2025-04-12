import AWS from 'aws-sdk'
import { configureAWS } from '@/config'

configureAWS()
export const s3 = new AWS.S3()
