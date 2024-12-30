export interface IconProps {
    width: number
    height: number
}

interface BaseCategoryProps extends IconProps {
    isFavorites: boolean
}

export function BackButtonIcon({ width, height }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 25L1 13L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export function WrittenCategoryIcon({ width, height }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 1.66675H8.00004C7.26366 1.66675 6.66671 2.2637 6.66671 3.00008V5.66675C6.66671 6.40313 7.26366 7.00008 8.00004 7.00008H16C16.7364 7.00008 17.3334 6.40313 17.3334 5.66675V3.00008C17.3334 2.2637 16.7364 1.66675 16 1.66675Z"
                fill="#7DDEFF"
            />
            <path
                d="M17.3334 4.33341H20C20.7073 4.33341 21.3856 4.61437 21.8857 5.11446C22.3858 5.61456 22.6667 6.29284 22.6667 7.00008V25.6667C22.6667 26.374 22.3858 27.0523 21.8857 27.5524C21.3856 28.0525 20.7073 28.3334 20 28.3334H4.00004C3.2928 28.3334 2.61452 28.0525 2.11442 27.5524C1.61433 27.0523 1.33337 26.374 1.33337 25.6667V7.00008C1.33337 6.29284 1.61433 5.61456 2.11442 5.11446C2.61452 4.61437 3.2928 4.33341 4.00004 4.33341H6.66671"
                fill="#7DDEFF"
            />
            <path d="M12 13.6667H17.3334H12Z" fill="#7DDEFF" />
            <path d="M12 20.3334H17.3334H12Z" fill="#7DDEFF" />
            <path d="M6.66671 13.6667H6.68004H6.66671Z" fill="#7DDEFF" />
            <path d="M6.66671 20.3334H6.68004H6.66671Z" fill="#7DDEFF" />
            <path
                d="M17.3334 4.33341H20C20.7073 4.33341 21.3856 4.61437 21.8857 5.11446C22.3858 5.61456 22.6667 6.29284 22.6667 7.00008V25.6667C22.6667 26.374 22.3858 27.0523 21.8857 27.5524C21.3856 28.0525 20.7073 28.3334 20 28.3334H4.00004C3.2928 28.3334 2.61452 28.0525 2.11442 27.5524C1.61433 27.0523 1.33337 26.374 1.33337 25.6667V7.00008C1.33337 6.29284 1.61433 5.61456 2.11442 5.11446C2.61452 4.61437 3.2928 4.33341 4.00004 4.33341H6.66671M12 13.6667H17.3334M12 20.3334H17.3334M6.66671 13.6667H6.68004M6.66671 20.3334H6.68004M8.00004 1.66675H16C16.7364 1.66675 17.3334 2.2637 17.3334 3.00008V5.66675C17.3334 6.40313 16.7364 7.00008 16 7.00008H8.00004C7.26366 7.00008 6.66671 6.40313 6.66671 5.66675V3.00008C6.66671 2.2637 7.26366 1.66675 8.00004 1.66675Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function HottestCategoryIcon({ width, height }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.33329 16.3333C7.21735 16.3333 8.06519 15.9821 8.69031 15.357C9.31544 14.7319 9.66663 13.8841 9.66663 13C9.66663 11.16 8.99996 10.3333 8.33329 9C6.90396 6.14267 8.03463 3.59467 11 1C11.6666 4.33333 13.6666 7.53333 16.3333 9.66667C19 11.8 20.3333 14.3333 20.3333 17C20.3333 18.2257 20.0919 19.4393 19.6228 20.5717C19.1538 21.7041 18.4663 22.733 17.5996 23.5997C16.7329 24.4663 15.704 25.1538 14.5717 25.6229C13.4393 26.0919 12.2256 26.3333 11 26.3333C9.77429 26.3333 8.56062 26.0919 7.42825 25.6229C6.29587 25.1538 5.26698 24.4663 4.4003 23.5997C3.53362 22.733 2.84613 21.7041 2.37708 20.5717C1.90804 19.4393 1.66663 18.2257 1.66663 17C1.66663 15.4627 2.24396 13.9413 2.99996 13C2.99996 13.8841 3.35115 14.7319 3.97627 15.357C4.60139 15.9821 5.44924 16.3333 6.33329 16.3333Z"
                fill="#FF9575"
                stroke="#1B1B1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function BaseCategoryIcon({ width, height, isFavorites }: BaseCategoryProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15 1.6665L19.12 10.0132L28.3333 11.3598L21.6666 17.8532L23.24 27.0265L15 22.6932L6.75996 27.0265L8.33329 17.8532L1.66663 11.3598L10.88 10.0132L15 1.6665Z"
                fill={`${isFavorites ? '#FF9575' : '#FFFFFF'}`}
                stroke="#1B1B1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function NotificationIcon({ width, height }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21 9.66663C21 7.54489 20.1571 5.51006 18.6569 4.00977C17.1566 2.50948 15.1217 1.66663 13 1.66663C10.8783 1.66663 8.84344 2.50948 7.34315 4.00977C5.84286 5.51006 5 7.54489 5 9.66663C5 19 1 21.6666 1 21.6666H25C25 21.6666 21 19 21 9.66663Z"
                stroke="#FF9575"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.5384 23C15.2674 23.4055 14.8784 23.7422 14.4104 23.9762C13.9424 24.2102 13.4118 24.3333 12.8717 24.3333C12.3317 24.3333 11.8011 24.2102 11.3331 23.9762C10.8651 23.7422 10.4761 23.4055 10.2051 23"
                stroke="#FF9575"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
