interface IconProps {
    width: number
    height: number
}

export function BackButtonIcon({ width, height }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 25L1 13L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
