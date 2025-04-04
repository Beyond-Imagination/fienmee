import React, { useState } from 'react'
import { registerEventComments } from '@/api/event'

interface Props {
    eventId: string
}

export default function EventCommentInput({ eventId }: Props) {
    const [comment, setComment] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target
        setComment(value)
    }

    const handleSubmit = async () => {
        if (comment === '') return
        try {
            await registerEventComments({
                eventId: eventId,
                comment: comment,
            })
            setComment('')
        } catch {
            alert('댓글 등록에 실패했습니다.')
        }
    }

    return (
        <div className="flex w-full items-center gap-2 border-t py-4">
            <textarea
                className="border w-full rounded-full text-sm px-4 py-2 h-10"
                placeholder="댓글을 입력해주세요."
                value={comment}
                onChange={handleChange}
            />
            <button className="bg-[#FF9575] text-white px-4 h-10 rounded-lg flex items-center justify-center min-w-[60px]" onClick={handleSubmit}>
                등록
            </button>
        </div>
    )
}
