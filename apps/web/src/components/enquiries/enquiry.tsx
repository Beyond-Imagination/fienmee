import { IEnquiry } from '@fienmee/types'

interface Props {
    enquiry: IEnquiry | undefined
}

const formatDate = (date: Date) => {
    const temp = new Date(date)
    const year = temp.getFullYear()
    const month = String(temp.getMonth() + 1).padStart(2, '0')
    const d = String(temp.getDate()).padStart(2, '0')
    const hour = String(temp.getHours()).padStart(2, '0')
    const min = String(temp.getMinutes()).padStart(2, '0')
    return `${year}.${month}.${d} ${hour}:${min}`
}

export default function Enquiry({ enquiry }: Props) {
    if (!enquiry) {
        return <div></div>
    }

    return (
        <div className="flex flex-col border-b border-b-[#C8C5CC] gap-2.5 px-4 py-3">
            <div className="flex flex-row gap-[0.5rem] text-sm text-[#78767C]">
                <div className="border border-[#D9D9D9] rounded-2xl px-3">접수</div>
                <span>{formatDate(enquiry.createdAt)}</span>
            </div>
            <span>{enquiry.title}</span>
        </div>
    )
}
