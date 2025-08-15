'use client'

import { SearchIcon } from '@/components/icon'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface Inputs {
    text: string
}

export default function SearchBar() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = ({ text }) => {
        const q = text.trim()
        if (!q) return
        router.push(`/search?query=${encodeURIComponent(q)}`)
    }

    return (
        <form className="flex flex-row justify-center gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <input
                id="text"
                className="w-4/5 text-lg border-b-[1px] border-gray-300 outline-0"
                placeholder="원하는 행사명을 입력하세요"
                {...register('text', {
                    required: 'search target is required',
                    validate: v => v.trim() !== '' || 'title is required',
                })}
            />
            <button type="submit" disabled={isSubmitting} aria-label="검색">
                <SearchIcon width="2rem" height="2rem" />
            </button>
        </form>
    )
}
