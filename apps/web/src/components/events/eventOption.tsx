import React from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteEventById } from '@/api/event'
import Dropdown from '@/components/dropdown'
import { OptionIcon } from '@/components/icon'
import { titleStore } from '@/store'

export default function EventOption({ eventId }: { eventId: string }) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { setTitle } = titleStore()

    const deleteMutation = useMutation({
        mutationFn: deleteEventById,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['events'] })
            router.back()
            toast.success(<span>행사가 성공적으로 삭제되었어요</span>)
        },
        onError: () => {
            toast.error(<span>행사 삭제를 실패했어요. 다시 한 번 시도해주세요.</span>)
        },
    })

    const handleDelete = () => {
        deleteMutation.mutate(eventId)
    }

    return (
        <Dropdown Icon={() => OptionIcon({ width: '1.5rem', height: '1.5rem' })} xTranslate={'-translate-x-20'}>
            {/* TODO: add modify function */}
            <Link className="block w-24 p-3 border-b border-gray-200" href={'/events/update'} onClick={() => setTitle('행사 수정')}>
                수정하기
            </Link>
            <button className="w-24 p-3" onClick={handleDelete}>
                삭제하기
            </button>
        </Dropdown>
    )
}
