import React from 'react'

interface PhotoUploaderProps {
    photos: string[]
    onAddPhoto: (event: React.ChangeEvent<HTMLInputElement>) => void
    onRemovePhoto: (index: number) => void
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photos, onAddPhoto, onRemovePhoto }) => {
    return (
        <div className="mt-8 mb-2 px-6 flex items-center gap-4 overflow-x-auto">
            <label
                htmlFor="photo-upload"
                className="w-16 h-16 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer bg-white flex-shrink-0"
            >
                <img src="/Camera.svg" alt="카메라 아이콘" className="h-10 w-10 object-contain" />
            </label>
            <input type="file" id="photo-upload" accept="image/*" className="hidden" multiple onChange={onAddPhoto} />

            {photos.map((photo, index) => (
                <div key={index} className="relative w-16 h-16 border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={photo} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={() => onRemovePhoto(index)}
                        className="absolute top-1 right-1 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center"
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    )
}

export default PhotoUploader
