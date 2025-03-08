import { NotificationIcon, TextLogo } from '@/components/icon'

export function LogoHeader() {
    return (
        <div className="flex flex-row w-full h-[6.25rem] items-center justify-between bg-white pt-10 p-2">
            <div className="ps-4">
                <TextLogo width="9.375rem" height="3rem" />
            </div>
            <div className="flex flex-row pe-4 gap-4">
                {/*TODO: navigate to notification page*/}
                <button type="button">
                    <NotificationIcon width="2.25rem" height="2.25rem" />
                </button>
            </div>
        </div>
    )
}
