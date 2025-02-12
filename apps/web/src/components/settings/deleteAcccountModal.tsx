interface Props {
    isOpen: boolean
    onClose: () => void
}

export default function DeleteAccountModal({ isOpen, onClose }: Props) {
    return (
        <div
            className={`fixed inset-0 bg-white items-center justify-center shadow-[0_-1px_4px_rgba(0,0,0,0.25)] rounded-2xl z-50 
                        ${isOpen ? 'translate-y-[2rem]' : 'translate-y-full'} transition-transform duration-300 p-6`}
        >
            <div className="flex flex-col w-full">
                <span className="text-2xl text-center font-semibold w-full">회원 탈퇴 시 주의 사항</span>
                {/*TODO: add Cautions*/}
                <p className="text-xl break-words my-4">
                    {'................................................................................................................................................' +
                        '...................................................................................................................................................' +
                        '...................................................................................................................................................' +
                        '...................................................................................................................................................'}
                </p>
            </div>
            <div className="flex flex-col items-center w-fll gap-3 mt-4">
                {/*TODO: add action deleting account action*/}
                <button className="rounded-lg h-12 w-3/4 text-white bg-[#FF9575] py-3">회원 탈퇴</button>
                <button className="rounded-lg h-12 w-3/4 border border-[#78767C] py-3" onClick={onClose}>
                    회원 탈퇴 취소
                </button>
            </div>
        </div>
    )
}
