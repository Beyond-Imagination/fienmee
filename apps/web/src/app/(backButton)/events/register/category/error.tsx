'use client'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error }) {
    useEffect(() => {
        console.error('카테고리 불러오기 실패:', error)
    }, [error])

    return (
        <div className="max-w-xs mx-auto text-center bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">카테고리를 불러오는 데 실패했습니다.</p>
        </div>
    )
}
