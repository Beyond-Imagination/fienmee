import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { IEnquiryFormInputs, IPostEnquiryRequest } from '@fienmee/types'
import { postEnquiry } from '@/api/enquiries'

interface Props {
    onSuccess: () => void
}

export default function EnquiryForm({ onSuccess }: Props) {
    const router = useRouter()
    const {
        register,
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<IEnquiryFormInputs>()

    const mutation = useMutation({
        mutationFn: (request: IPostEnquiryRequest) => {
            return postEnquiry(request)
        },
        onSuccess: async () => {
            onSuccess()
        },
    })
    const onSubmit = (data: IEnquiryFormInputs) => {
        const request: IPostEnquiryRequest = {
            body: data,
        }
        mutation.mutate(request)
    }

    return (
        <form className="flex flex-col w-full gap-[2.125rem] px-[24px] pt-[2rem]" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <label>제목</label>
                <input
                    id="create/title"
                    type="text"
                    className="border rounded-lg p-2 px-4 outline-0"
                    placeholder="제목을 입력해주세요"
                    {...register('title', {
                        required: '제목 입력이 필요합니다',
                        validate: value => value.trim() !== '' || '제목 입력이 필요합니다',
                    })}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label>문의내용</label>
                <textarea
                    id="create/body"
                    className="border rounded-lg p-2 px-4 outline-0"
                    rows={10}
                    placeholder="문의내용을 입력해주세요"
                    {...register('body', {
                        required: '내용 입력이 필요합니다',
                        validate: value => value.trim() !== '' || '내용 입력이 필요합니다',
                    })}
                />
            </div>
            <div className="grid grid-cols-2 gap-[1.5625rem]">
                <button
                    type="button"
                    className="rounded-lg text-black bg-[#D9D9D9] py-1.5"
                    onClick={() => {
                        reset()
                        router.back()
                    }}
                >
                    취소
                </button>
                <button type="submit" className="rounded-lg text-white bg-[#FF9575] py-1.5" disabled={isSubmitting || mutation.isPending}>
                    등록 하기
                </button>
            </div>
        </form>
    )
}
