import { eventStore } from '@/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateEventLikes } from '@/api/event'
import { LikeIcon, UnlikeIcon } from '@/components/icon'

export default function EventLikes() {
    const { event, setEvent } = eventStore()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (eventId: string) => {
            return updateEventLikes(eventId)
        },
        onSuccess: async () => {
            setEvent({
                ...event,
                likeCount: event.isLiked ? event.likeCount - 1 : event.likeCount + 1,
                isLiked: !event.isLiked,
            })
            await queryClient.invalidateQueries({ queryKey: ['events'] })
        },
    })

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        mutation.mutate(event._id)
    }

    return (
        <>
            <button className="flex items-center space-x-3" onClick={handleClick}>
                {event.isLiked ? <LikeIcon width="1.5rem" height="1.25rem" /> : <UnlikeIcon width="1.5rem" height="1.25rem" />}
                <span className="text-sm">{event.likeCount}</span>
            </button>
        </>
    )
}
