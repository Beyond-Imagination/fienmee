import React from 'react'

interface InputFieldProps {
    label: string
    placeholder: string
    type?: string
    rows?: number
    name: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type = 'text', rows, name, value, onChange }) => {
    return (
        <div>
            <label className="block text-base font-medium mb-2">{label}</label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    className="w-full border rounded-lg px-4 py-2"
                    rows={rows}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className="w-full border rounded-lg px-4 py-2"
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    )
}

export default InputField
