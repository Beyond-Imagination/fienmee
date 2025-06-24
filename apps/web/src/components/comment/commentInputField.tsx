import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { registerEventComments } from '@/api/event'
import { IPostEventCommentRequest } from '@fienmee/types'

interface Props {
    eventId: string
}

export default function EventCommentInput({ eventId }: Props) {
    const [comment, setComment] = useState('')
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (request: IPostEventCommentRequest) => {
            return registerEventComments(request)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['comments', eventId] })
            setComment('')
        },
        onError: () => {
            alert('댓글 등록에 실패했습니다.')
        },
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    const handleSubmit = () => {
        if (comment.trim() === '') {
            return
        }
        const request: IPostEventCommentRequest = {
            eventId: eventId,
            comment: comment,
        }
        mutation.mutate(request)
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
