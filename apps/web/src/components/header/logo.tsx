import { NotificationIcon, TextLogo } from '@/components/icon'

export function LogoHeader() {
    return (
        <div className="fixed top-0 left-0 flex flex-row items-center justify-between w-full pt-10 p-2 z-10 bg-white">
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
