// apps/web/src/app/(navigation)/search/page.tsx
import SearchScreen from '@/components/search/SearchScreen'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function Page({ searchParams }: { searchParams?: SearchParams }) {
    const sp = (await searchParams) ?? {}

    const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : (v ?? ''))

    const initialQuery = first(sp.query)
    const initialCategory = first(sp.category)

    return <SearchScreen initialQuery={initialQuery} initialCategory={initialCategory} />
}
