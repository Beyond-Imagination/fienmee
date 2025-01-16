'use client'

import { SearchIcon } from '@/components/icon'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Inputs {
    text: string
}

export default function SearchBar() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        // TODO: add search logic
        console.log(data)
    }
    return (
        <form className="flex flex-row justify-center gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <input
                id="text"
                className="w-4/5 text-lg border-b-[1px] border-gray-300 outline-0"
                placeholder="원하는 행사명을 입력하세요"
                {...register('text', {
                    required: 'search target is required',
                    validate: value => value.trim() !== '' || 'title is required',
                })}
            />
            <button type="submit" disabled={isSubmitting}>
                <SearchIcon width={32} height={32} />
            </button>
        </form>
    )
}
