import React from 'react'

import Dropdown from '@/components/dropdown'
import { OptionIcon } from '@/components/icon'

interface Props {
    onEdit: () => void
    onDelete: () => void
    isDeleteDisabled?: boolean
}

export default function CommentOption({ onEdit, onDelete, isDeleteDisabled = false }: Props) {
    return (
        <Dropdown Icon={() => OptionIcon({ width: '1.5rem', height: '1.5rem' })} xTranslate={'-translate-x-20'}>
            <button className="block w-24 p-3 border-b border-gray-200" onClick={onEdit}>
                수정하기
            </button>
            <button className="block w-24 p-3 border-b border-gray-200" onClick={onDelete} disabled={isDeleteDisabled}>
                삭제하기
            </button>
        </Dropdown>
    )
}
