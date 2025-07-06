import { CategoryItem, CategoryItemSkeleton } from '@/components/events/categoryItem'
import { CategoryCode, fixedCategory } from '@fienmee/types'

export default function Loading() {
    return (
        <div className="grid justify-items-center px-8 mt-6">
            <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                <CategoryItem category={{ _id: CategoryCode.MYEVENT, title: fixedCategory[CategoryCode.MYEVENT].title }} isFavorites={false} />
                <CategoryItem category={{ _id: CategoryCode.HOTEVENT, title: fixedCategory[CategoryCode.HOTEVENT].title }} isFavorites={false} />
            </div>
            <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                {Array.from({ length: 10 }).map((_, index) => (
                    <CategoryItemSkeleton key={index} />
                ))}
            </div>
        </div>
    )
}
