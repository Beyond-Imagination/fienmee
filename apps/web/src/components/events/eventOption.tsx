import React from 'react'
import Dropdown from '@/components/dropdown'
import { OptionIcon } from '@/components/icon'

export default function EventOption() {
    return (
        <Dropdown Icon={OptionIcon} xTranslate={'-translate-x-20'}>
            {/* TODO: add modify function */}
            <button className="w-24 p-3 border-b border-gray-200">수정하기</button>
            {/* TODO: add delete function */}
            <button className="w-24 p-3">삭제하기</button>
        </Dropdown>
    )
}
