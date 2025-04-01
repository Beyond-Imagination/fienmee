import Link from 'next/link'

interface Props {
    items: string[]
    links: string[]
    selected: string
}

export default function TabBar({ items, links, selected }: Props) {
    return (
        <div className={`grid grid-cols-${items.length} px-4`}>
            {items.map((item, index) => (
                <Link key={`tabItem-${item}`} className="flex flex-col items-center gap-2" href={links[index]} replace={true}>
                    <h3 className={`text-center text-lg ${item === selected ? 'text-[#FF9575]' : 'text-[#49454F]'}`}>{item}</h3>
                    <div className={`h-1 rounded-t-xl ${item === selected ? 'bg-[#FF9575]' : 'bg-inherit'}`} style={{ width: `${item.length}rem` }} />
                </Link>
            ))}
        </div>
    )
}
