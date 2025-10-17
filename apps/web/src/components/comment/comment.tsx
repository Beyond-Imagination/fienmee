import { useState } from 'react'
import { IComment, IDeleteCommentRequest } from '@fienmee/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { deleteEventCommentById, toggleEventCommentLike } from '@/api/event'
import CommentOption from '@/components/comment/commentOption'
import CommentUpdateField from '@/components/comment/commentUpdateField'
import { LikeIcon, UnlikeIcon } from '@/components/icon'
import LoadingOverlay from '@/components/comment/commentLoadingOverlay'

interface Props {
    comment: IComment
}

export function EventComment({ comment }: Props) {
    const queryClient = useQueryClient()
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const deleteMutation = useMutation({
        mutationFn: (request: IDeleteCommentRequest) => deleteEventCommentById(request),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['comments', comment.eventId] })
            toast.success(<span>댓글 삭제에 성공하였습니다.</span>)
        },
        onError: () => {
            toast.error(<span>댓글 삭제에 실패했습니다.</span>)
        },
    })

    const handleDelete = () => {
        if (deleteMutation.isPending) return
        deleteMutation.mutate({
            eventId: comment.eventId,
            commentId: comment._id,
        })
    }

    const likeMutation = useMutation({
        mutationFn: ({ eventId, commentId }: { eventId: string; commentId: string }) => toggleEventCommentLike(eventId, commentId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['comments', comment.eventId] })
        },
        onError: () => {
            toast.error(<span>좋아요 처리에 실패했습니다.</span>)
        },
    })

    const handleToggleLike = () => {
        if (likeMutation.isPending) return
        likeMutation.mutate({ eventId: comment.eventId, commentId: comment._id })
    }

    return (
        <div className="flex flex-col gap-6 py-2 relative">
            {deleteMutation.isPending && <LoadingOverlay />}
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-sm text-gray-500">{comment.userId.isDeleted ? `탈퇴한 회원` : comment.userId?.nickname}</div>
                    {isEdit ? (
                        <CommentUpdateField comment={comment} onSuccess={() => setIsEdit(false)} />
                    ) : (
                        <div className="text-base text-gray-900">{comment.comment}</div>
                    )}
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button
                        aria-label="toggle comment like"
                        onClick={handleToggleLike}
                        disabled={likeMutation.isPending}
                        className="disabled:opacity-50"
                        type="button"
                    >
                        {comment.isLiked ? <LikeIcon width="1.5rem" height="1.25rem" /> : <UnlikeIcon width="1.5rem" height="1.25rem" />}
                    </button>
                    <span className="text-sm">{comment.likeCount}</span>
                    {comment.isAuthor && (
                        <CommentOption onEdit={() => setIsEdit(true)} onDelete={handleDelete} isDeleteDisabled={deleteMutation.isPending} />
                    )}
                </div>
            </div>
        </div>
    )
}
