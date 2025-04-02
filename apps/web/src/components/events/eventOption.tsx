import React from 'react'
import Dropdown from '@/components/dropdown'
import { OptionIcon } from '@/components/icon'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEventById } from '@/api/event'
import Link from 'next/link'

export default function EventOption({ eventId }: { eventId: string }) {
    const router = useRouter()
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteEventById,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['events'] })
            router.push('/events/category')
        },
    })

    const handleDelete = () => {
        deleteMutation.mutate(eventId)
    }

    return (
        <Dropdown Icon={() => OptionIcon({ width: '1.5rem', height: '1.5rem' })} xTranslate={'-translate-x-20'}>
            {/* TODO: add modify function */}
            <Link className="w-24 p-3 border-b border-gray-200" href={'/events/update'}>
                수정하기
            </Link>
            <button className="w-24 p-3" onClick={handleDelete}>
                삭제하기
            </button>
        </Dropdown>
    )
}
