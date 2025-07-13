import React, { useRef } from 'react'
import { ClipLoader } from 'react-spinners'

import { useS3Upload, useImageLoader } from '@/hooks/s3'
import CameraIcon from '@/components/icon/Camera'

interface PhotoUploaderProps {
    photoKeys: string[]
    onKeysChange: (keys: string[]) => void
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photoKeys, onKeysChange }) => {
    const { isUploading, handleImageUpload } = useS3Upload()
    const inputRef = useRef<HTMLInputElement | null>(null)

    const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleImageUpload(event.target.files, newPhotos => {
            const newKeys = newPhotos.map(p => p.key)
            onKeysChange([...photoKeys, ...newKeys])
        })
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const handleRemovePhoto = (indexToRemove: number) => {
        onKeysChange(photoKeys.filter((_, index) => index !== indexToRemove))
    }

    return (
        <div className="flex flex-row flex-wrap justify-start items-center w-full overflow-x-auto mt-8 mb-2 px-6 gap-4">
            <label
                htmlFor="photo-upload"
                className="w-16 h-16 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer bg-white flex-shrink-0"
            >
                <CameraIcon className="h-10 w-10 object-contain" />
            </label>
            <input type="file" id="photo-upload" accept="image/*" className="hidden" multiple onChange={onImageUpload} disabled={isUploading} />
            {photoKeys.map((key, index) => (
                <ImagePreview key={key} s3Key={key} onRemove={() => handleRemovePhoto(index)} />
            ))}
            {isUploading && <ClipLoader color="#3b82f6" />}
        </div>
    )
}

const ImagePreview: React.FC<{ s3Key: string; onRemove: () => void }> = ({ s3Key, onRemove }) => {
    const { imageUrl, isLoading } = useImageLoader(s3Key)

    if (isLoading) {
        return (
            <div className="w-16 h-16 border border-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                <ClipLoader size={20} />
            </div>
        )
    }

    return (
        <div className="relative w-16 h-16 border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
            <img src={imageUrl} alt={`Uploaded image`} className="w-full h-full object-cover" />
            <button
                type="button"
                onClick={onRemove}
                className="absolute top-1 right-1 w-5 h-5 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center text-xs"
            >
                ×
            </button>
        </div>
    )
}

export default PhotoUploader
