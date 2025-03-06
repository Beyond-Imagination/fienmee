import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

import { getEnquiries } from '@/api/enquiries'
import Enquiry from '@/components/enquiries/enquiry'
import Spinner from '@/components/spinner'

export default function EnquiryList() {
    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['enquiries'],
        queryFn: ({ pageParam }) => getEnquiries(pageParam as number, 10),
        initialPageParam: 1,
        getNextPageParam: lastPage => {
            if (lastPage.page.hasNextPage) {
                return lastPage.page.page + 1
            }
        },
        getPreviousPageParam: lastPage => {
            if (lastPage.page.hasPrevPage) {
                return lastPage.page.page - 1
            }
        },
    })
    const { ref, inView } = useInView()
    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    if (isLoading) {
        return (
            <div className="flex flex-col w-full gap-4 pt-4">
                <Spinner size="3rem" color="#FF9575" />
                <div className="text-center text-[0.75rem] text-[#78767C] pt-2">최근 1년간의 문의내역만 조회가능합니다</div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col w-full">
                <div className="text-lg text-center text-[#78767C]">
                    문의내역을 불러오는 데 실패하였습니다.
                    <br />
                    다시 시도해 주시길 바랍니다.
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full">
            {data && data.pages.map(page => page.enquiries.map(enquiry => <Enquiry key={enquiry._id} enquiry={enquiry} />))}
            {isFetchingNextPage ? <Enquiry enquiry={undefined} /> : <div ref={ref} />}
            <div className="text-center text-[0.75rem] text-[#78767C] pt-2">최근 1년간의 문의내역만 조회가능합니다</div>
        </div>
    )
}
