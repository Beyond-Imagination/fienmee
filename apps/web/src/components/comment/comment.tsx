import { useState } from 'react'
import { IComment } from '@fienmee/types'

import CommentOption from '@/components/comment/commentOption'
import CommentUpdateField from '@/components/comment/commentUpdateField'
import { UnlikeIcon } from '@/components/icon'

interface Props {
    comment: IComment
}

export function EventComment({ comment }: Props) {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    return (
        <div className="flex flex-col gap-6 py-2 relative">
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-sm text-gray-500">{comment.nickname}</div>
                    {isEdit ? (
                        <CommentUpdateField comment={comment} onSuccess={() => setIsEdit(false)} />
                    ) : (
                        <div className="text-base text-gray-900">{comment.comment}</div>
                    )}
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <UnlikeIcon width="1.5rem" height="1.25rem" />
                    {comment.isAuthor && <CommentOption onEdit={() => setIsEdit(true)} />}
                </div>
            </div>
        </div>
    )
}
