import { deleteSchedule } from '@/api/schedules'
import { useQueryClient } from '@tanstack/react-query'

interface ScheduleDeleteModalProps {
    isOpen: boolean
    onClose: () => void
    scheduleId: string
    setModalType: (type: string) => void
}

export default function ScheduleDeleteModal({ isOpen, onClose, scheduleId, setModalType }: ScheduleDeleteModalProps) {
    const queryClient = useQueryClient()

    const onDelete = async () => {
        try {
            await deleteSchedule(scheduleId)
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
            alert('삭제 완료')
            setModalType('none')
            onClose()
        } catch {
            alert('삭제 실패')
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">정말 삭제하시겠습니까?</p>
                <div className="flex justify-end space-x-4">
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
