import { CategoryItem, CategoryItemSkeleton } from '@/components/events/categoryItem'

export default function Loading() {
    return (
        <div className="grid justify-items-center px-8 mt-6">
            <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                <CategoryItem category={'내가 등록한 행사'} isFavorites={false} />
                <CategoryItem category={'인기 행사'} isFavorites={false} />
            </div>
            <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
            </div>
        </div>
    )
}
