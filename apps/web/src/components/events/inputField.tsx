import React from 'react'

interface InputFieldProps {
    label: string
    placeholder: string
    type?: string
    rows?: number
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type = 'text', rows }) => {
    return (
        <div>
            <label className="block text-base font-medium mb-2">{label}</label>
            {type === 'textarea' ? (
                <textarea placeholder={placeholder} className="w-full border rounded-lg px-4 py-2" rows={rows} />
            ) : (
                <input type={type} placeholder={placeholder} className="w-full border rounded-lg px-4 py-2" />
            )}
        </div>
    )
}

export default InputField
