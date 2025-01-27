import React from 'react'

interface SubmitButtonProps {
    label: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
    return (
        <button type="submit" className="w-full bg-[#FF9575] text-white font-semibold py-2 rounded-lg hover:bg-[#FF7A58]">
            {label}
        </button>
    )
}

export default SubmitButton
