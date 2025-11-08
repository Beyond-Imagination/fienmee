import { ClipLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center text-lg font-semibold">
            <ClipLoader color="#FF6B6B" size={50} />
        </div>
    )
}
