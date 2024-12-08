import { CategoryItem } from '@/components/events/categoryItem'

export default function Page() {
    // TODO: add get category names
    return (
        <div className="grid justify-items-center px-8 mt-6">
            <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                <CategoryItem category={'내가 등록한 행사'} isFavorites={false} />
                <CategoryItem category={'인기 행사'} isFavorites={false} />
            </div>
            {/*User Favorites Categories*/}
            <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                <CategoryItem category={'축제'} isFavorites={true} />
                <CategoryItem category={'축제'} isFavorites={true} />
                <CategoryItem category={'축제'} isFavorites={true} />
            </div>
            {/*Other Categories*/}
            <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                <CategoryItem category={'축제'} isFavorites={false} />
                <CategoryItem category={'축제'} isFavorites={false} />
                <CategoryItem category={'축제'} isFavorites={false} />
            </div>
        </div>
    )
}
