import Link from 'next/link'
import { NotificationIcon, TextLogo } from '@/components/icon'

export function LogoHeader() {
    return (
        <div className="flex flex-row w-full h-[5rem] items-center justify-between bg-white p-2">
            <div className="ps-4">
                <TextLogo width="9.375rem" height="3rem" />
            </div>
            <div className="flex flex-row pe-4 gap-4">
                <Link href={'/notifications'} type="button">
                    <NotificationIcon width="2.25rem" height="2.25rem" />
                </Link>
            </div>
        </div>
    )
}
