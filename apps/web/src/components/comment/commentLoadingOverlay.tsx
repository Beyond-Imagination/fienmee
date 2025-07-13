import { ClipLoader } from 'react-spinners'

export default function LoadingOverlay() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <ClipLoader size={30} color="#FF6B6B" />
        </div>
    )
}
