export default function NotificationSkeleton() {
    return (
        <div className="flex flex-row items-center w-full bg-white p-4 gap-4 animate-pulse">
            <div className="h-8 w-8 bg-[#D9D9D9] rounded-full" />
            <div className="flex flex-col gap-2 w-5/6">
                <div className="h-5 bg-[#D9D9D9] rounded-lg" />
                <div className="h-4 bg-[#D9D9D9] rounded-lg" />
                <div className="h-4 bg-[#D9D9D9] rounded-lg" />
            </div>
        </div>
    )
}
