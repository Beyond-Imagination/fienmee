import React from 'react'

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        preserveAspectRatio="xMidYMid meet"
        className={`w-8 h-8 ${className}`} // 기본 크기 설정 가능
    >
        <g transform="translate(0,30) scale(0.1,-0.1)" fill="currentColor" stroke="none">
            <path d="M95 250 c-10 -11 -31 -20 -46 -20 -37 0 -49 -24 -49 -100 0 -100 0 -100 148 -100 86 0 132 4 140 12 16 16 16 160 0 176 -7 7 -25 12 -40 12 -17 0 -33 8 -40 20 -10 15 -24 20 -54 20 -28 0 -47 -6 -59 -20z m97 -20 c9 -13 24 -20 45 -20 l33 0 0 -80 0 -80 -120 0 -120 0 0 80 0 80 35 0 c24 0 37 6 45 20 7 13 21 20 40 20 19 0 34 -7 42 -20z" />
            <path d="M110 180 c-39 -39 -14 -100 43 -100 53 0 76 61 37 100 -11 11 -29 20 -40 20 -11 0 -29 -9 -40 -20z m71 -26 c9 -11 10 -20 2 -32 -15 -24 -44 -27 -59 -7 -28 38 27 75 57 39z" />
        </g>
    </svg>
)

export default CameraIcon
