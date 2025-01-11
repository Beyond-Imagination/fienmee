import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
    photo: string[]
    name: string
}

export default function EventPhoto({ photo, name }: Props) {
    return (
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} className="w-full h-64">
            {photo.map((photoUrl, index) => (
                <SwiperSlide key={index}>
                    <div className="w-full h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photoUrl} alt={`${name} ${index + 1}`} className="w-full h-full object-contain" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
