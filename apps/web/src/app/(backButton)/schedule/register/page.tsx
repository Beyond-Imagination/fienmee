'use client'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'

export default function ScheduleRegister() {
    const [isAllDay, setIsAllDay] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // todo: add logic for validating and organizing request body object
        redirect('/')
        // todo: send request to server
    }

    return (
        <div>
            <form className={'flex flex-col items-start p-6'} onSubmit={handleSubmit}>
                <div className={'flex flex-col mb-6 w-full'}>
                    <label className="block text-base font-medium mb-2" htmlFor={'input-title'}>
                        일정 제목
                    </label>
                    <input className="border rounded-lg" name="title" type="text" id={'input-title'} />
                </div>

                <div className="w-full mb-5">
                    <label className="block text-base font-medium mb-2">일정 시간</label>
                    <div className="border rounded-lg p-4 w-full">
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
                                <div className="flex flex-col gap-3 items-center">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-sm text-gray-700">시작</span>
                                        <input name="start-date" type="date" className="border rounded-lg px-2 py-1 w-36" />
                                        <input name="start-time" type="time" className="border rounded-lg px-2 py-1 w-28" />
                                    </div>

                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-sm text-gray-700">종료</span>
                                        <input name="end-date" type="date" className="border rounded-lg px-2 py-1 w-36" />
                                        <input name="end-time" type="time" className="border rounded-lg px-2 py-1 w-28" />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className={'flex flex-col mb-6 w-full'}>
                    <label className="block text-base font-medium mb-2" htmlFor={'input-description'}>
                        설명
                    </label>
                    <textarea className="border rounded-lg" name="description" id={'input-description'} />
                </div>

                <div className="w-full mt-10 flex flex-row justify-between gap-5 flex-center item-center">
                    <button
                        type="reset"
                        className="w-full hover:bg-gray-100 hover:text-gray-700 border border-gray-300 bg-white text-black font-semibold p-2 rounded-lg hover:bg-gray"
                    >
                        초기화
                    </button>
                    <button type="submit" className="w-full bg-[#FF9575] text-white font-semibold p-2 rounded-lg hover:bg-[#FF7A58]">
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    )
}
