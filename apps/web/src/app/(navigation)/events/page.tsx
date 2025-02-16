'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { CategoryItem } from '@/components/events/categoryItem'
import { getEventsCategories } from '@/api/event'
import { useEffect, useState } from 'react'

export default function Page() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient) {
        return <PageComponent />
    }
}

function PageComponent() {
    const { data } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: () => getEventsCategories(),
        refetchOnWindowFocus: false,
    })
    return (
        <div className="grid justify-items-center px-8 mt-6">
            <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                {data.defaultCategories.map(category => (
                    <CategoryItem key={`category${category._id}`} category={category} isFavorites={false} />
                ))}
            </div>
            {/*User Favorites Categories*/}
            {data.favoriteCategories.length > 0 && (
                <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                    {data.favoriteCategories.map(category => (
                        <CategoryItem key={`favoriteCategory${category._id}`} category={category} isFavorites={true} />
                    ))}
                </div>
            )}
            {/*Other Categories*/}
            {data.categories.length > 0 && (
                <div className="grid border-b gap-4 w-full py-2 border-gray-300">
                    {data.categories.map(category => (
                        <CategoryItem key={`category${category._id}`} category={category} isFavorites={false} />
                    ))}
                </div>
            )}
        </div>
    )
}
