'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IPostReviewRequest, IReviewFormInputs } from '@fienmee/types'
import { postReview } from '@/api/review'
import { useS3Upload } from '@/hooks/s3'
import { CloseIcon, StarIcon } from '@/components/icon'
import CameraIcon from '@/components/icon/Camera'
import { eventStore, titleStore } from '@/store'

export default function Page() {
    const { setTitle } = titleStore()
    const { event } = eventStore()
    const [photoViewUrls, setPhotoViewUrls] = useState<string[]>([])
    const router = useRouter()
    const queryClient = useQueryClient()
    const { isUploading, handleImageUpload } = useS3Upload()

    useEffect(() => {
        setTitle('리뷰 작성하기')
    }, [setTitle])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<IReviewFormInputs>({
        defaultValues: {
            rating: new Array(5).fill(false),
            photo: [],
        },
    })

    const mutation = useMutation({
        mutationFn: (request: IPostReviewRequest) => postReview(request),
        onSuccess: async () => {
            // TODO: reset cache for review statistics
            await queryClient.invalidateQueries({ queryKey: ['review', event._id] })
            router.back()
            setTitle('')
        },
    })

    const handleRatingClick = (index: number) => {
        const newRating = watch('rating').map((_, i) => i <= index)
        setValue('rating', newRating)
    }

    const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleImageUpload(event.target.files, newPhotos => {
            setValue('photo', [...watch('photo'), ...newPhotos.map(p => p.key)])
            setPhotoViewUrls(prev => [...prev, ...newPhotos.map(p => p.viewUrl)])
        })
        event.target.value = ''
    }

    const handleRemoveImage = (index: number) => {
        setValue(
            'photo',
            watch('photo').filter((_, i) => i !== index),
        )
        setPhotoViewUrls(prev => prev.filter((_, i) => i !== index))
    }

    const onSubmit = (data: IReviewFormInputs) => {
        const request: IPostReviewRequest = {
            uri: {
                id: event._id,
            },
            body: {
                photo: data.photo,
                body: data.body,
                rating: data.rating.reduce((pre, cur) => pre + (cur ? 1 : 0), 0),
            },
        }
        mutation.mutate(request)
    }

    return (
        <form className="flex flex-col w-full gap-[2.125rem] px-[1.5rem] pt-[2rem]" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <label>별점</label>
                <div className="flex flex-row gap-2.5">
                    {watch('rating').map((star, i) => (
                        <div className="cursor-pointer" key={`review-star-${i}`} onClick={() => handleRatingClick(i)}>
                            <StarIcon color={`${star ? '#F89B00' : '#CCCCCC'}`} width="2.5rem" height="2.375rem" stroke="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label>리뷰 내용</label>
                <textarea
                    id="create/body"
                    className="border rounded-lg p-2 px-4 outline-0"
                    rows={10}
                    placeholder="리뷰 내용을 입력해주세요"
                    {...register('body', {
                        required: '내용 입력이 필요합니다',
                        validate: value => value.trim() !== '' || '내용 입력이 필요합니다',
                    })}
                />
            </div>
            {photoViewUrls.length === 0 ? (
                <label className="flex flex-row justify-center items-center gap-[0.3125rem] w-full h-20 border-2 border-[#FF9575] border-dashed rounded-lg">
                    <CameraIcon className="w-6 h-6 text-[#FF9575]" />
                    <span className="text-[#FF9575]">사진 추가</span>
                    <input type="file" accept="image/*" className="hidden" multiple onChange={onImageUpload} disabled={isUploading} />
                </label>
            ) : (
                <div className="flex flex-row flex-wrap items-center gap-y-2 gap-x-5">
                    {photoViewUrls.map((p, i) => (
                        <div className="relative w-20 h-20" key={p}>
                            <div className="relative top-0 left-0 w-20 h-20 overflow-hidden rounded-lg">
                                <Image loader={() => p} src={p} alt={`review-image`} fill />
                            </div>
                            <div
                                className="absolute -top-1 -right-1 flex justify-center items-center w-6 h-6 bg-[#1E1E1E] rounded-3xl"
                                onClick={() => handleRemoveImage(i)}
                            >
                                <CloseIcon width="0.8rem" height="0.8rem" color="#FFFFFF" stroke="" />
                            </div>
                        </div>
                    ))}
                    {isUploading && <ClipLoader color="#FF9575" />}
                    <label className="w-20 h-20 border-2 border-[#FF9575] border-dashed rounded-lg">
                        <CameraIcon className="relative top-5 left-5  w-6 h-6 text-[#FF9575]" />
                        <input type="file" accept="image/*" className="hidden" multiple onChange={onImageUpload} disabled={isUploading} />
                    </label>
                </div>
            )}
            <button
                type="submit"
                className="self-center w-full bg-[#FF9575] text-base text-white text-center rounded-lg py-2"
                disabled={isSubmitting || mutation.isPending || isUploading}
            >
                등록 하기
            </button>
        </form>
    )
}
