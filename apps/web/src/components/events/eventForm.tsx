import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { ICategory, IEvent } from '@fienmee/types'
import { registerEvent, updateEvent } from '@/api/event'
import { CategorySelectModal } from '@/components/events/categorySelectModal'
import EventTimeSelector from '@/components/events/eventTimeSelector'
import EventVenueSelector from '@/components/events/eventVenueSelector'
import InputField from '@/components/events/inputField'
import SubmitButton from '@/components/events/submitButton'
import { ArrowIcon } from '@/components/icon'
import { eventStore } from '@/store'

interface EventFormProps {
    selectedCategories: Set<ICategory>
    handleCategories: (categories: Set<ICategory>) => void
    photos: string[]
    initEvent: IEvent
    isRegister: boolean
}

const EventForm: React.FC<EventFormProps> = ({ selectedCategories, handleCategories, photos, initEvent, isRegister }) => {
    const router = useRouter()
    const { setEvent } = eventStore()
    const [position, setPosition] = useState({ lat: initEvent.location.coordinates[1], lng: initEvent.location.coordinates[0] })
    const [formData, setFormData] = useState<IEvent>(initEvent)
    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (name === 'targetAudience') {
            setFormData(prevState => ({
                ...prevState,
                [name]: value ? [value] : [],
            }))
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }))
        }
    }

    const onStartDateTimeChange = (dateTime: string) => {
        setFormData(prevState => ({ ...prevState, startDate: new Date(dateTime) }))
    }

    const onEndDateTimeChange = (dateTime: string) => {
        setFormData(prevState => ({ ...prevState, endDate: new Date(dateTime) }))
    }

    const toggleAllDay = () => {
        setFormData(prevState => ({ ...prevState, isAllDay: !prevState.isAllDay }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (!isRegister) {
                await updateEvent({
                    body: {
                        ...formData,
                        category: Array.from(selectedCategories).map(category => category._id),
                        photo: photos,
                        location: {
                            type: 'Point',
                            coordinates: [position.lng, position.lat],
                        },
                    },
                    uri: { _id: initEvent._id },
                })
                toast.success(<span>행사가 성공적으로 수정되었어요.</span>)
                setEvent(formData)
                router.push('/events/detail')
            } else {
                await registerEvent({
                    body: {
                        ...formData,
                        category: Array.from(selectedCategories).map(category => category._id),
                        photo: photos,
                        location: {
                            type: 'Point',
                            coordinates: [position.lng, position.lat],
                        },
                    },
                })
                toast.success(<span>행사가 성공적으로 등록되었어요.</span>)
            }
        } catch (error) {
            console.error('이벤트 등록 실패:', error)
            toast.error(<span>행사 등록을 실패했어요. 다시 한 번 시도해주세요.</span>)
        }
    }

    return (
        <>
            <form className="p-6 w-full max-w-lg mx-auto flex flex-col gap-6" onSubmit={handleSubmit}>
                <InputField label="행사 제목" placeholder="행사 제목을 입력해주세요" value={formData.name} name="name" onChange={handleChange} />
                <div className="flex items-center">
                    <label className="font-medium mr-4 whitespace-nowrap">카테고리</label>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(selectedCategories).map((category, index) => (
                            <span key={index} className="bg-white px-2 py-1 rounded border">
                                {category.title}
                            </span>
                        ))}
                    </div>
                    <button type="button" onClick={() => setShowCategoryModal(true)} className="text-blue-500 ml-auto">
                        <ArrowIcon width="1.5rem" height="1.5rem" />
                    </button>
                </div>
                <div className="w-full mb-5">
                    <label className="block text-base font-medium mb-2">행사 시간</label>
                    <EventTimeSelector
                        isAllDay={formData.isAllDay}
                        toggleAllDay={toggleAllDay}
                        initStartDate={formData.startDate}
                        initEndDate={formData.endDate}
                        onStartDateChange={onStartDateTimeChange}
                        onEndDateChange={onEndDateTimeChange}
                    />
                </div>
                <div>
                    <label className="font-medium">행사 장소</label>
                    <EventVenueSelector initialPosition={position} onPositionChange={setPosition} />
                </div>
                <InputField label="이용 요금" placeholder="₩ 이용 요금을 입력해주세요" value={formData.cost} name="cost" onChange={handleChange} />
                <InputField
                    label="이용 대상"
                    placeholder="이용 대상을 입력해주세요"
                    value={formData.targetAudience?.[0]}
                    name="targetAudience"
                    onChange={handleChange}
                />
                <InputField
                    label="설명"
                    placeholder="행사에 대한 설명을 작성해주세요"
                    value={formData.description}
                    type="textarea"
                    rows={4}
                    name="description"
                    onChange={handleChange}
                />
                <SubmitButton label={isRegister ? '등록하기' : '수정하기'} />
            </form>
            <CategorySelectModal
                selectedCategories={selectedCategories}
                handleCategories={handleCategories}
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
            />
        </>
    )
}

export default EventForm
