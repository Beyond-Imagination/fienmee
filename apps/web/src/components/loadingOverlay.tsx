import { ClipLoader } from 'react-spinners'

export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <ClipLoader size={50} color="#FF6B6B" />
        </div>
    )
}
