export interface ICulturalEvent {
    CODENAME: string // 분류
    GUNAME: string // 자치구
    TITLE: string
    DATE: string
    PLACE: string
    ORG_NAME: string // 기관 명
    USE_TRGT: string // 이용 대상
    USE_FEE: string
    PLAYER: string
    PROGRAM: string // 프로그램 소개
    ETC_DESC: string // 기타 내용
    ORG_LINK: string // 홈페이지 주소
    MAIN_IMG: string // 이미지
    RGSTDATE: string // 신청일
    TICKET: string // 시민 or 기관
    STRTDATE: string // 시작일
    END_DATE: string // 종료일
    THEMECODE: string // 테마 분류
    LOT: string // 경도(X 좌표)
    LAT: string // 위도(Y 좌표)
    IS_FREE: string // 유무료
    HMPG_ADDR: string // 문화포털상세 URL
}

export interface IGetSeoulDataResponse {
    culturalEventInfo: {
        list_total_count: number
        RESULT: {
            CODE: string
            MESSAGE: string
        }
        row: ICulturalEvent[]
    }
}
