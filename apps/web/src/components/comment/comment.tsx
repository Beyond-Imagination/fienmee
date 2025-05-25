import { UnlikeIcon } from '@/components/icon'
import { IComment } from '@fienmee/types'

interface Props {
    comment: IComment
}

export function EventComment({ comment }: Props) {
    return (
        <div className="flex flex-col gap-6 px-4 py-2">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-sm text-gray-500">{comment.nickname}</div>
                    <div className="text-base text-gray-900">{comment.comment}</div>
                </div>
                <div className="self-center">
                    <UnlikeIcon width="1.5rem" height="1.25rem" />
                </div>
            </div>
        </div>
    )
}
