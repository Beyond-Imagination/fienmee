import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import EventImage from '@/components/events/EventImage'

interface Props {
    photo: string[]
    name: string
}

export default function EventPhoto({ photo, name }: Props) {
    return (
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} className="w-full h-64">
            {photo.map((s3Key, index) => (
                <SwiperSlide key={index}>
                    <div className="w-full h-full">
                        <EventImage s3Key={s3Key} alt={`${name} ${index + 1}`} className="w-full h-full object-contain" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
