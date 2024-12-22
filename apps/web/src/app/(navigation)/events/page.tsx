'use client'

import { CategoryItem } from '@/components/events/categoryItem'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getEventsCategories } from '@/api/event'

export default function Page() {
    const { data } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: () => getEventsCategories(),
        refetchOnWindowFocus: false,
    })
    return (
        <div className="grid justify-items-center px-8 mt-6">
            <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                <CategoryItem category={'내가 등록한 행사'} isFavorites={false} />
                <CategoryItem category={'인기 행사'} isFavorites={false} />
            </div>
            {/*User Favorites Categories*/}
            {data.favoriteCategories.length > 0 && (
                <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                    {data.favoriteCategories.map((category, index) => (
                        <CategoryItem key={`favoriteCategory${index}`} category={category} isFavorites={true} />
                    ))}
                </div>
            )}
            {/*Other Categories*/}
            {data.categories.length > 0 && (
                <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                    {data.categories.map((category, index) => (
                        <CategoryItem key={`category${index}`} category={category} isFavorites={false} />
                    ))}
                </div>
            )}
        </div>
    )
}
