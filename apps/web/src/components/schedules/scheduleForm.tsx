import React, { useState } from 'react'
import { IScheduleItem, IUpdateScheduleRequest } from '@fienmee/types'
import { registerSchedule, updateSchedule } from '@/api/schedules'
import EventTimeSelector from '@/components/events/eventTimeSelector'
import { useRouter } from 'next/navigation'

interface ScheduleFormProps {
    initSchedule?: IScheduleItem
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ initSchedule }) => {
    const [isAllDay, setIsAllDay] = useState<boolean>(false)
    const router = useRouter()
    const [formData, setFormData] = useState<IUpdateScheduleRequest>(
        initSchedule || {
            _id: '',
            name: '',
            startDate: new Date(),
            endDate: new Date(),
            description: '',
        },
    )
    const onStartDateTimeChange = (dateTime: string) => {
        setFormData(prevState => ({ ...prevState, startDate: new Date(dateTime) }))
    }

    const onEndDateTimeChange = (dateTime: string) => {
        setFormData(prevState => ({ ...prevState, endDate: new Date(dateTime) }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleReset = () => {
        if (initSchedule) {
            setFormData(initSchedule)
        } else {
            setFormData({
                _id: '',
                name: '',
                startDate: new Date(),
                endDate: new Date(),
                description: '',
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // todo: add logic for validating and organizing request body object
        try {
            if (initSchedule) {
                await updateSchedule(formData)
                alert('일정이 수정되었습니다.')
                router.push('/')
            } else {
                await registerSchedule(formData)
                alert('일정이 등록되었습니다.')
                router.push('/')
            }
        } catch (error) {
            console.error('일정 등록 실패:', error)
            alert('일정 등록에 실패했습니다.')
        }
    }

    return (
        <div>
            <form className={'flex flex-col items-start p-6'} onReset={handleReset} onSubmit={handleSubmit}>
                <div className={'flex flex-col mb-6 w-full'}>
                    <label className="block text-base font-medium mb-2" htmlFor={'input-name'}>
                        일정 제목
                    </label>
                    <input className="border rounded-lg" name="name" type="text" id={'input-name'} value={formData.name} onChange={handleChange} />
                </div>

                <div className="w-full mb-5">
                    <label className="block text-base font-medium mb-2">일정 시간</label>
                    <EventTimeSelector
                        isAllDay={isAllDay}
                        toggleAllDay={() => setIsAllDay(!isAllDay)}
                        initStartDate={formData.startDate}
                        initEndDate={formData.endDate}
                        onStartDateChange={onStartDateTimeChange}
                        onEndDateChange={onEndDateTimeChange}
                    />
                </div>

                <div className={'flex flex-col mb-6 w-full'}>
                    <label className="block text-base font-medium mb-2" htmlFor={'input-description'}>
                        설명
                    </label>
                    <textarea
                        className="border rounded-lg"
                        name="description"
                        id={'input-description'}
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="w-full mt-10 flex flex-row justify-between gap-5 flex-center item-center">
                    <button
                        type="reset"
                        className="w-full hover:bg-gray-100 hover:text-gray-700 border border-gray-300 bg-white text-black font-semibold p-2 rounded-lg hover:bg-gray"
                    >
                        초기화
                    </button>
                    <button type="submit" className="w-full bg-[#FF9575] text-white font-semibold p-2 rounded-lg hover:bg-[#FF7A58]">
                        {initSchedule ? '수정하기' : '등록하기'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ScheduleForm
