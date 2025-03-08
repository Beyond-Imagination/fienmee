'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { IEnquiryFormInputs, IPostEnquiryRequest } from '@fienmee/types'
import { postEnquiry } from '@/api/enquiries'
import { AlterDialog } from '@/components/modal'
import { CheckBoxIcon } from '@/components/icon'

export default function EnquiryForm() {
    const router = useRouter()
    const [showModal, setShowModal] = useState<boolean>(false)
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
            setShowModal(true)
        },
    })
    const onSubmit = (data: IEnquiryFormInputs) => {
        const request: IPostEnquiryRequest = {
            body: data,
        }
        mutation.mutate(request)
    }
    const modalClose = () => {
        setShowModal(false)
        router.back()
    }

    return (
        <>
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
            <AlterDialog isOpen={showModal}>
                <div className="flex flex-col justify-center items-center gap-5 py-5">
                    <CheckBoxIcon width="5.625rem" height="5.625rem" />
                    <span className="text-center">
                        문의가 정상적으로 접수되었습니다. <br />
                        답변은 계정에 등록된 이메일로 발송될 예정입니다.
                    </span>
                    <button className="rounded-lg text-[#FF9575] w-1/2 border-[#FF9575] border p-2" onClick={modalClose}>
                        돌아가기
                    </button>
                </div>
            </AlterDialog>
        </>
    )
}
