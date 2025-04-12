import React, { useRef, useState } from 'react'
import CameraIcon from '@/components/icon/Camera'
import { getPresignedUrl, uploadToS3 } from '@/api/event'

interface PhotoUploaderProps {
    photos: string[]
    onAddPhoto: (photoUrls: string[]) => void
    onRemovePhoto: (index: number) => void
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photos, onAddPhoto, onRemovePhoto }) => {
    const [uploading, setUploading] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        try {
            const uploadPromises = Array.from(files).map(async file => {
                try {
                    const { presignedUrl } = await getPresignedUrl({
                        fileName: file.name,
                        fileType: file.type,
                    })

                    await uploadToS3(presignedUrl, file)
                    return presignedUrl.split('?')[0]
                } catch (error) {
                    console.error(error)
                    return null
                }
            })

            const photoUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[]
            if (photoUrls.length > 0) onAddPhoto(photoUrls)
        } catch (error) {
            // TODO: error 페이지로 이동
            console.error(error)
        } finally {
            setUploading(false)
            if (inputRef.current) inputRef.current.value = ''
        }
    }

    return (
        <div className="mt-8 mb-2 px-6 flex items-center gap-4 overflow-x-auto">
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
            {uploading && <p>Uploading...</p>}
        </div>
    )
}

export default PhotoUploader
