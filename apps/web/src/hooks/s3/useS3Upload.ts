import { useState } from 'react'
import { toast } from 'react-toastify'
import { getUploadUrl, getViewUrl, uploadToS3 } from '@/api/s3'

export const useS3Upload = () => {
    const [isUploading, setIsUploading] = useState(false)

    const uploadFile = async (file: File): Promise<{ key: string; viewUrl: string } | null> => {
        try {
            const { presignedUrl: uploadUrl } = await getUploadUrl({
                fileName: file.name,
                fileType: file.type,
            })
            const key = uploadUrl.split('?')[0].split('/').pop()!
            await uploadToS3(uploadUrl, file)

            const { presignedUrl: viewUrl } = await getViewUrl(key)
            return { key, viewUrl }
        } catch (error) {
            console.error(error)
            return null
        }
    }

    const handleImageUpload = async (files: FileList | null, onSuccess: (results: Array<{ key: string; viewUrl: string }>) => void) => {
        if (!files || files.length === 0) return

        setIsUploading(true)

        try {
            const results = await Promise.all(Array.from(files).map(uploadFile))
            const succeeded = results.filter((result): result is { key: string; viewUrl: string } => result !== null)
            const failedCount = results.filter(result => result === null).length

            if (succeeded.length > 0) {
                onSuccess(succeeded)
            }

            if (failedCount > 0) {
                toast.error(`${failedCount}개의 사진 업로드를 실패했어요. 다시 한번 시도해주세요.`)
            }
        } catch (error) {
            console.error(error)
            toast.error('사진 업로드 중 예상치 못한 오류가 발생했어요. 다시 시도해주세요.')
        } finally {
            setIsUploading(false)
        }
    }

    return { isUploading, handleImageUpload }
}
