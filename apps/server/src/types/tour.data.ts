export interface ICommonTourData {
    contentid: string // 콘텐츠 ID
    contenttypeid: string // 관광타입 ID
    title: string // 제목
    createdtime: string // 등록일
    modifiedtime: string // 콘텐츠 수정일
    tel: string // 전화번호
    firstimage: string // 원본 대표 이미지
    firstimage2: string // 썸내일 대표 이미지
    cpyrhDivCd: string // 저작권 유형 (1-출처표시, 3-출처표시+변경금지)
    areacode: string // 지역 코드
    sigungucode: string // 시군구코드
    lDongRegnCd: string // 법정동 시도 코드
    lDongSignguCd: string // 법정동 시군구 코드
    lclsSystm1: string // 분류체계 대분류
    lclsSystm2: string // 분류체계 중분류
    lclsSystm3: string // 분류체계 소분류
    cat1: string // 대분류 코드
    cat2: string // 중분류 코드
    cat3: string // 소분류 코드
    addr1: string // 주소
    addr2: string // 상세 주소
    zipcode: string // 우편 번호
    mapx: string // 경도
    mapy: string // 위도
    mlevel: string // Map Level 응답
}

export interface IFestivalBaseData {
    eventstartdate: string // 행사 시작일
    eventenddate: string // 행사 종료일
    progresstype: string // 진행 상태 정보
    festivaltype: string // 축제 유형명
}

export interface ITourFestivalData extends ICommonTourData, IFestivalBaseData {}

export interface ITourDataDetail extends IFestivalBaseData {
    contentid: string
    contenttypeid: string
    sponsor1: string // 주죄자1 정보
    sponsor1tel: string // 주최자1 번호
    sponsor2: string // 주최자2 정보
    sponsor2tel: string // 주최자2 번호
    playtime: string // 공연시간
    eventplace: string // 행사장소
    eventhompage: string // 행사홈페이지
    agelimit: string // 관람가능연령
    bookingplace: string // 예매처
    placeinfo: string // 행사장위치안내
    subevent: string // 부대행사
    program: string // 행사 프로그램
    usetimefestival: string // 이용요금
    discountinfofestival: string // 할인정보
    spendtimefestival: string // 관람소요시간
    festivalgrade: string // 축제등급
}

export interface ITourDataInfo {
    contentid: string
    contenttypeid: string
    serialnum: string // 반복 일련번호
    infoname: string // 설명 제목
    infotext: string // 설명 내용
    fldgubun: string // 일련 번호
}

export interface IResponseTourApiHeader {
    resultCode: string
    resultMsg: string
}

export interface IResponseFestivalApi {
    response: {
        header: IResponseTourApiHeader
        body: {
            numOfRows: number
            pageNo: number
            totalCount: number
            items: {
                item: ITourFestivalData[]
            }
        }
    }
}

export interface IResponseFestivalDetailApi {
    response: {
        header: IResponseTourApiHeader
        body: {
            numOfRows: number
            pageNo: number
            totalCount: number
            items: {
                item: ITourDataDetail
            }
        }
    }
}

export interface IResponseFestivalInfoApi {
    response: {
        header: IResponseTourApiHeader
        body: {
            numOfRows: number
            pageNo: number
            totalCount: number
            items: {
                item: ITourDataInfo[]
            }
        }
    }
}
