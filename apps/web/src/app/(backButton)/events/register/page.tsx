'use client'

import { useState } from 'react'

export default function RegisterPage() {
    const [isAllDay, setIsAllDay] = useState(false)
    const [photos, setPhotos] = useState<string[]>([])

    const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []) // null 처리
        const newPhotos = files.map(file => URL.createObjectURL(file))
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]) // 타입이 명확하므로 에러 없음
        event.target.value = '' // 동일 파일 다시 업로드 가능하도록 초기화
    }

    const handleRemovePhoto = (index: number) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index))
    }

    return (
        <div className="min-h-screen flex flex-col px-4">
            {/* 사진 등록 */}
            <div className="mt-8 mb-2 px-6 flex items-center gap-4 overflow-x-auto">
                {/* 등록 버튼 */}
                <label
                    htmlFor="photo-upload"
                    className="w-16 h-16 border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer bg-white flex-shrink-0"
                >
                    <img src="/Camera.png" alt="카메라 아이콘" className="h-10 w-10 object-contain" />
                </label>
                <input type="file" id="photo-upload" accept="image/*" className="hidden" multiple onChange={handleAddPhoto} />

                {/* 등록된 사진들 */}
                {photos.map((photo, index) => (
                    <div key={index} className="relative w-16 h-16 border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={photo} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-1 right-1 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>

            {/* 메인 폼 */}
            <form className="p-6 w-full max-w-lg mx-auto flex flex-col gap-6">
                {/* 행사 제목 */}
                <div>
                    <label htmlFor="title" className="block text-base font-medium mb-2">
                        행사 제목
                    </label>
                    <input type="text" id="title" placeholder="행사 제목을 입력해주세요" className="w-full border rounded-lg px-4 py-2" />
                </div>

                {/* 행사 시간 */}
                <div>
                    <label className="block text-base font-medium mb-2">행사 시간</label>
                    <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-700">하루 종일</span>
                            <button
                                type="button"
                                className={`w-11 h-5 flex items-center rounded-full p-1 ${isAllDay ? 'bg-black' : 'bg-gray-300'}`}
                                onClick={() => setIsAllDay(!isAllDay)}
                            >
                                <div className={`h-4 w-4 rounded-full bg-white transform transition-transform ${isAllDay ? 'translate-x-5' : ''}`} />
                            </button>
                        </div>
                        <hr className="border-gray-300 mb-4" />
                        {!isAllDay && (
                            <>
                                <div className="flex flex-col gap-3">
                                    {/* 시작 */}
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-sm text-gray-700">시작</span>
                                        <input type="date" className="border rounded-lg px-2 py-1 w-36" />
                                        <input type="time" className="border rounded-lg px-2 py-1 w-28" />
                                    </div>

                                    {/* 종료 */}
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-sm text-gray-700">종료</span>
                                        <input type="date" className="border rounded-lg px-2 py-1 w-36" />
                                        <input type="time" className="border rounded-lg px-2 py-1 w-28" />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* 행사 장소 */}
                <div>
                    <label className="block text-base font-medium mb-2">행사 장소</label>
                    <input type="text" placeholder="위치 추가" className="w-full border rounded-lg px-4 py-2" />
                </div>

                {/* 이용 요금 */}
                <div>
                    <label className="block text-base font-medium mb-2">이용 요금</label>
                    <input type="text" placeholder="₩ 이용 요금을 입력해주세요" className="w-full border rounded-lg px-4 py-2" />
                </div>

                {/* 설명 */}
                <div>
                    <label className="block text-base font-medium mb-2">설명</label>
                    <textarea placeholder="행사에 대한 설명을 작성해주세요" className="w-full border rounded-lg px-4 py-2" rows={4} />
                </div>

                {/* 등록 버튼 */}
                <button type="submit" className="w-full bg-[#FF9575] text-white font-semibold py-2 rounded-lg hover:bg-[#FF7A58]">
                    등록하기
                </button>
            </form>
        </div>
    )
}
