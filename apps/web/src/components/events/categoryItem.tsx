import { BaseCategoryIcon, HottestCategoryIcon, WrittenCategoryIcon } from '@/components/icon'
import Link from 'next/link'

interface Props {
    category: string
    isFavorites: boolean
}

export function CategoryItem({ category, isFavorites }: Props) {
    // TODO: change category names
    if (category === '내가 등록한 행사') {
        return (
            <Link className="flex flex-row w-full items-center justify-start p-4 gap-4" href={`/events/category?name=${category}`}>
                <WrittenCategoryIcon width={40} height={40} />
                <div className="text-3xl text-center">내가 등록한 행사</div>
            </Link>
        )
    } else if (category === '인기 행사') {
        return (
            <Link className="flex flex-row w-full items-center justify-start p-4 gap-4" href={`/events/category?name=${category}`}>
                <HottestCategoryIcon width={40} height={40} />
                <div className="text-3xl text-center">인기 행사</div>
            </Link>
        )
    } else {
        // TODO: add logic making to Favorites
        return (
            <Link className="flex flex-row w-full items-center justify-start p-4 gap-4" href={`/events/category?name=${category}`}>
                <BaseCategoryIcon width={40} height={40} isFavorites={isFavorites} />
                <div className="text-3xl text-center">{category}</div>
            </Link>
        )
    }
}
