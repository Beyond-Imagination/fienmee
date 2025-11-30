import express, { Router } from 'express'
import asyncify from 'express-asyncify'
import { bindingCargo, getCargo } from 'express-cargo'

import { s3 } from '@/services/aws'
import { AWS_S3_BUCKET } from '@/config'
import { GetS3UploadUrlPayload, GetS3ViewUrlPayload } from '@/types/payload'

const router: Router = asyncify(express.Router())

router.get('/upload-url', bindingCargo(GetS3UploadUrlPayload), async (req, res) => {
    const { fileName } = getCargo<GetS3UploadUrlPayload>(req)

    const params = {
        Bucket: AWS_S3_BUCKET!,
        Key: `${Date.now()}-${fileName}`,
        Expires: 3600,
    }

    const presignedUrl = await s3.getSignedUrlPromise('putObject', params)
    res.json({ presignedUrl })
})

router.get('/view-url', bindingCargo(GetS3ViewUrlPayload), async (req, res) => {
    const { key } = getCargo<GetS3ViewUrlPayload>(req)

    const params = {
        Bucket: AWS_S3_BUCKET!,
        Key: key,
        Expires: 3600,
    }

    const presignedUrl = await s3.getSignedUrlPromise('getObject', params)
    res.json({ presignedUrl })
})

export default router
