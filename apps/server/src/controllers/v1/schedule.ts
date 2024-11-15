import asyncify from 'express-asyncify'
import multer from 'multer'
import express, { Request, Response } from 'express'
import { ScheduleModel } from '@/models/schedule'

type Callback = { error: Error | null; fileName: string }
const router = asyncify(express.Router())
const storage = multer.diskStorage({
    // 아래의 경로는 테스트를 위한 임시 경로입니다.
    destination: './upload/schedule',
    // 별도의 파일 서비스로 분리하기 전에는, 임시적으로 원본 파일 이름을 그대로 사용합니다.
    filename: (req: Request, file: Express.Multer.File, callback: Callback) => {
        callback(null, file.originalname)
    },
})
// TODO: 추후 파일명 검증과 같은 설정 추가
const fileUpload = multer({ storage: storage })

// TODO: 모델을 저장 성공하는 경우에만 스토리지에 파일 저장
router.post('/', fileUpload.array('images'), async (req: Request, res: Response) => {
    const jsonData = JSON.parse(req.body.jsonData)
    const savedImageNames = req.files.map(image => image.originalname)
    const schedule = await ScheduleModel.create({
        name: jsonData.title,
        startDate: jsonData.startDate,
        endDate: jsonData.endDate,
        address: jsonData.address,
        location: {
            type: 'Point',
            coordinates: [jsonData.location.longitude, jsonData.location.latitude],
        },
        description: jsonData.description,
        images: savedImageNames,
    })
    res.status(201).json({
        scheduleId: schedule._id,
    })
})

export default router
