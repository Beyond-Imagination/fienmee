import SearchBar from '@/components/searchBar'
import PreviewEventLst from '@/components/events/previewEventList'

export default function Home() {
    const today = new Date()

    return (
        <div className="flex flex-col justify-items-center min-h-[80vh] my-6">
            <div className="px-8 mb-8">
                <SearchBar />
            </div>
            <div className="grid gap-10 w-full px-1 pb-10">
                {/*TODO: change event category*/}
                <PreviewEventLst title={`${today.getDate()}일 일정`} category="기타" />
                <div className="bg-[#F6F5F5] shadow-inner shadow-[#E4E4E4] w-full h-2" />
                <PreviewEventLst title="관심 카테고리" category="경관" />
                <div className="bg-[#F6F5F5] shadow-inner shadow-[#E4E4E4] w-full h-2" />
                <PreviewEventLst title="인기 행사" category="콘서트" />
            </div>
        </div>
    )
}
