import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IComment, IPutEventCommentRequest } from '@fienmee/types'
import { updateEventComment } from '@/api/event'

interface Props {
    comment: IComment
    onSuccess: () => void
}
export default function CommentUpdateField({ comment, onSuccess }: Props) {
    const [body, setBody] = useState<string>(comment.comment)
    const queryClient = useQueryClient()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onSuccess()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onSuccess])

    const mutation = useMutation({
        mutationFn: (request: IPutEventCommentRequest) => {
            return updateEventComment(request)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['comments', comment.eventId] })
            setBody('')
            onSuccess()
            toast.success(<span>댓글이 성공적으로 삭제되었어요.</span>)
        },
        onError: () => {
            toast.error(<span>댓글 수정을 실패했어요. 다시 한 번 시도해주세요.</span>)
        },
    })

    const handleSubmit = () => {
        if (body.trim() === '') {
            toast.error(<span>공백만 입력할 수 없습니다.</span>)
            return
        }
        const request: IPutEventCommentRequest = {
            uri: {
                eventId: comment.eventId,
                commentId: comment._id,
            },
            body: {
                comment: body,
            },
        }
        mutation.mutate(request)
    }

    return (
        <div className="flex h-10 w-full items-center justify-center gap-2" ref={ref}>
            <textarea
                className="border w-full h-full rounded-full text-sm self-center px-4 py-2"
                placeholder="댓글을 입력해주세요."
                value={body}
                onChange={e => setBody(e.target.value)}
            />
            <button
                className="bg-[#FF9575] text-white text-base px-4 h-10 rounded-lg flex items-center justify-center min-w-[60px]"
                onClick={handleSubmit}
            >
                수정
            </button>
        </div>
    )
}
