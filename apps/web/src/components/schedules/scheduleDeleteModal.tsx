import React from 'react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSchedule } from '@/api/schedules'

interface ScheduleDeleteModalProps {
    isOpen: boolean
    onClose: () => void
    scheduleId: string
    setModalType: (type: string) => void
}

export default function ScheduleDeleteModal({ isOpen, onClose, scheduleId, setModalType }: ScheduleDeleteModalProps) {
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteSchedule,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['schedules'] })
            toast.success(<span>일정이 성공적으로 삭제되었어요.</span>)
            setModalType('none')
            onClose()
        },
        onError: () => {
            toast.error(<span>일정 삭제를 실패했어요. 다시 한 번 시도해주세요.</span>)
        },
    })

    const onDelete = () => mutate(scheduleId)

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4 text-center">정말 삭제하시겠습니까?</p>
                <div className="flex justify-center space-x-4">
                    <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
                        취소
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onDelete}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    )
}
