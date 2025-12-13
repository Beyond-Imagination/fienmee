'use client'

import React from 'react'
import { ErrorIcon } from './icon/icon'
import { TextLogo } from './icon/logo'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function ErrorPage() {
    const router = useRouter()

    return (
        <div className="flex flex-col min-h-screen px-5 bg-white">
            <div className="pt-6">
                <TextLogo width="98px" height="29px" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="mb-8">
                    <ErrorIcon width="120px" height="120px" />
                </div>
                <h1 className="text-[22px] font-bold text-gray-900 mb-2">일시적인 오류가 발생했습니다.</h1>
                <p className="text-base text-gray-600">잠시 후 다시 시도해주세요</p>
            </div>

            <div className="pb-8 w-full">
                <button
                    onClick={() => router.back()}
                    className="w-full bg-[#FF9575] text-white font-bold py-4 rounded-xl text-lg hover:bg-[#ff8560] transition-colors mb-4"
                >
                    이전으로
                </button>
                <div className="text-center">
                    <span className="text-xs text-gray-400">문제가 지속된다면 </span>
                    <Link href="/inquiry" className="text-xs text-gray-400 underline decoration-solid decoration-gray-400">
                        문의하기
                    </Link>
                    <span className="text-xs text-gray-400">에 남겨주세요.</span>
                </div>
            </div>
        </div>
    )
}
