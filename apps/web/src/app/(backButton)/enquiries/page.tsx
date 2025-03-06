'use client'

import { useState } from 'react'
import EnquiryForm from '@/components/enquiries/enquiryForm'
import EnquiryList from '@/components/enquiries/enquiryList'

export default function Page() {
    const [enquiryState, setEnquiryState] = useState<number>(0)

    return (
        <div className="min-h-full">
            <div className="flex items-end h-[77px] w-full py-[10px]">
                <div className="grid grid-cols-2 w-full text-center border-b border-b-[#C8C5CC] px-[24px]">
                    <div
                        className={`text-lg ${enquiryState === 0 ? 'text-black border-b border-b-black' : 'text-[#C8C5CC]'}`}
                        onClick={() => setEnquiryState(0)}
                    >
                        문의하기
                    </div>
                    <div
                        className={`text-lg ${enquiryState === 1 ? 'text-black border-b border-b-black' : 'text-[#C8C5CC]'}`}
                        onClick={() => setEnquiryState(1)}
                    >
                        문의내역확인
                    </div>
                </div>
            </div>
            {enquiryState === 0 ? <EnquiryForm onSuccess={() => setEnquiryState(1)} /> : <EnquiryList />}
        </div>
    )
}
