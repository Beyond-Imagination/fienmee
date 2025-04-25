import React from 'react'
import Dropdown from '@/components/dropdown'
import { OptionIcon } from '@/components/icon'

interface ScheduleOptionProps {
    onEdit: () => void
}

export default function ScheduleOption({ onEdit }: ScheduleOptionProps) {
    return (
        <Dropdown Icon={() => OptionIcon({ width: '1.5rem', height: '1.5rem' })} xTranslate={'-translate-x-20'}>
            <button className="block w-24 p-3 border-b border-gray-200" onClick={onEdit}>
                수정하기
            </button>
        </Dropdown>
    )
}
