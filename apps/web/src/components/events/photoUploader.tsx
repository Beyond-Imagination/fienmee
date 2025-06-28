import React, { useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

import { getUploadUrl, getViewUrl, uploadToS3 } from '@/api/s3'
import CameraIcon from '@/components/icon/Camera'

interface PhotoUploaderProps {
    photos: string[]
    onAddPhoto: (photoUrls: string[]) => void
    onRemovePhoto: (index: number) => void
}

const uploadFile = async (file: File): Promise<string | null> => {
    try {
        const { presignedUrl: uploadUrl } = await getUploadUrl({
            fileName: file.name,
            fileType: file.type,
        })
        const key = uploadUrl.split('?')[0].split('/').pop()!
        await uploadToS3(uploadUrl, file)

        const { presignedUrl: viewUrl } = await getViewUrl(key)
        return viewUrl
    } catch (error) {
        console.error(error)
        return null
    }
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photos, onAddPhoto, onRemovePhoto }) => {
    const [uploading, setUploading] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || files.length === 0) return

        setUploading(true)

        try {
            const results = await Promise.all(Array.from(files).map(uploadFile))
            const succeeded = results.filter((url): url is string => url !== null)
            const failed = Array.from(files).filter((_, idx) => results[idx] === null)

            if (succeeded.length > 0) {
                onAddPhoto(succeeded)
            }

            if (failed.length > 0) {
                showUploadFailToast()
            }
        } catch (error) {
            console.error(error)
            showUploadFailToast()
        } finally {
            setUploading(false)
            resetInput()
        }
    }

    const resetInput = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const showUploadFailToast = () => {
        toast.error(<span>사진 업로드를 실패했어요. 다시 한번 시도해주세요.</span>)
    }

    return (
        <div className="flex flex-row flex-wrap justify-start items-center w-full overflow-x-auto mt-8 mb-2 px-6 gap-4">
            <label
                htmlFor="photo-upload"
                className="w-16 h-16 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer bg-white flex-shrink-0"
            >
                <CameraIcon className="h-10 w-10 object-contain" />
            </label>
            <input type="file" id="photo-upload" accept="image/*" className="hidden" multiple onChange={handlePhotoUpload} disabled={uploading} />
            {photos.map((photo, index) => (
                <div key={index} className="relative w-16 h-16 border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={photo} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={() => onRemovePhoto(index)}
                        className="absolute top-1 right-1 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center"
                    >
                        ×
                    </button>
                </div>
            ))}
            {uploading && <ClipLoader color="#3b82f6" />}
        </div>
    )
}

export default PhotoUploader
