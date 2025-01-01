import { NotificationIcon, TextLogo } from '@/components/icon'

export function LogoHeader() {
    return (
        <div className="flex flex-row w-full items-center justify-between bg-white pt-10 p-2">
            <div className="ps-4">
                <TextLogo width={150} height={48} />
            </div>
            <div className="flex flex-row pe-4 gap-4">
                {/*TODO: navigate to notification page*/}
                <button type="button">
                    <NotificationIcon width={36} height={36} />
                </button>
            </div>
        </div>
    )
}
