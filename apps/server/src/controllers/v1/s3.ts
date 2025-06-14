import express, { Router } from 'express'
import asyncify from 'express-asyncify'
import { s3 } from '@/services/aws'
import { AWS_S3_BUCKET } from '@/config'

const router: Router = asyncify(express.Router())

router.get('/s3/upload-url', async (req, res) => {
    const fileName = String(req.query.fileName)

    const params = {
        Bucket: AWS_S3_BUCKET!,
        Key: `${Date.now()}-${fileName}`,
        Expires: 3600,
    }

    const presignedUrl = await s3.getSignedUrlPromise('putObject', params)
    res.json({ presignedUrl })
})

router.get('/s3/view-url', async (req, res) => {
    const key = req.query.key as string

    const params = {
        Bucket: AWS_S3_BUCKET,
        Key: key,
        Expires: 3600,
    }

    const presignedUrl = await s3.getSignedUrlPromise('getObject', params)
    res.json({ presignedUrl })
})
