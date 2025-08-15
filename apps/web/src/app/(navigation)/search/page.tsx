import SearchScreen from '@/components/search/SearchScreen'

type Props = { searchParams?: { query?: string; category?: string } }

export default function Page({ searchParams }: Props) {
    const initialQuery = (searchParams?.query ?? '').toString()
    const initialCategory = (searchParams?.category ?? '').toString()

    return <SearchScreen initialQuery={initialQuery} initialCategory={initialCategory} />
}
